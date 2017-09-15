/*  ********* TEMPORARILY HERE **************
 * - will be on npm soon -
 *   import { ngAspnetCoreEngine } from `@nguniversal/aspnetcore-engine`;
 */
import { Type, NgModuleFactory, NgModuleRef, ApplicationRef, Provider, CompilerFactory, Compiler } from '@angular/core';
import { platformServer, platformDynamicServer, PlatformState, INITIAL_CONFIG, renderModuleFactory } from '@angular/platform-server';
import { ResourceLoader } from '@angular/compiler';
import * as fs from 'fs';

import { REQUEST } from '../app/shared/constants/request';
import { ORIGIN_URL } from '../app/shared/constants/baseurl.constants';

export function createTransferScript(transferData: Object): string {
  return `<script>window['TRANSFER_CACHE'] = ${JSON.stringify(transferData)};</script>`;
}

export class FileLoader implements ResourceLoader {
  get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(url, (err: NodeJS.ErrnoException, buffer: Buffer) => {
        if (err) {
          return reject(err);
        }

        resolve(buffer.toString());
      });
    });
  }
}

export interface IRequestParams {
  location: any;              // e.g., Location object containing information '/some/path'
  origin: string;             // e.g., 'https://example.com:1234'
  url: string;                // e.g., '/some/path'
  baseUrl: string;            // e.g., '' or '/myVirtualDir'
  absoluteUrl: string;        // e.g., 'https://example.com:1234/some/path'
  domainTasks: Promise<any>;
  data: any;                  // any custom object passed through from .NET
}

export interface IEngineOptions {
  appSelector: string;
  request: IRequestParams;
  ngModule: Type<{}> | NgModuleFactory<{}>;
  providers?: Provider[];
};

export function ngAspnetCoreEngine(
  options: IEngineOptions
): Promise<{ html: string, globals: { styles: string, title: string, meta: string, transferData?: {}, [key: string]: any } }> {

  options.providers = options.providers || [];

  const compilerFactory: CompilerFactory = platformDynamicServer().injector.get(CompilerFactory);
  const compiler: Compiler = compilerFactory.createCompiler([
    {
      providers: [
        { provide: ResourceLoader, useClass: FileLoader }
      ]
    }
  ]);

  return new Promise((resolve, reject) => {

    try {
      const moduleOrFactory = options.ngModule;
      if (!moduleOrFactory) {
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
      }

      const extraProviders = options.providers.concat(
        options.providers,
        [
          {
            provide: INITIAL_CONFIG,
            useValue: {
              document: options.appSelector,
              url: options.request.url
            }
          },
          {
            provide: ORIGIN_URL,
            useValue: options.request.origin
          }, {
            provide: REQUEST,
            useValue: options.request.data.request
          }
        ]
      );

      const platform = platformServer(extraProviders);

      getFactory(moduleOrFactory, compiler)
        .then((factory: NgModuleFactory<{}>) => {

          return platform.bootstrapModuleFactory(factory).then((moduleRef: NgModuleRef<{}>) => {

            const state: PlatformState = moduleRef.injector.get(PlatformState);
            const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

            appRef.isStable
              .filter((isStable: boolean) => isStable)
              .first()
              .subscribe((stable) => {

                // Fire the TransferState Cache
                const bootstrap = moduleRef.instance['ngOnBootstrap'];
                bootstrap && bootstrap();

                // The parse5 Document itself
                const AST_DOCUMENT = state.getDocument();

                // Strip out the Angular application
                const htmlDoc = state.renderToString();

                const APP_HTML = htmlDoc.substring(
                  htmlDoc.indexOf('<body>') + 6,
                  htmlDoc.indexOf('</body>')
                );

                // Strip out Styles / Meta-tags / Title
                const STYLES = [];
                const SCRIPTS = [];
                const META = [];
                const LINKS = [];
                let TITLE = '';

                let STYLES_STRING: string = htmlDoc.indexOf('<style ng-transition') > -1
                                    ? htmlDoc.substring(
                                        htmlDoc.indexOf('<style ng-transition'),
                                        htmlDoc.lastIndexOf('</style>') + 8)
                                    : null;
              
                const HEAD = AST_DOCUMENT.head;

                let count = 0;

                for (let i = 0; i < HEAD.children.length; i++) {
                  let element = HEAD.children[i];

                  if (element.name === 'title') {
                    TITLE = element.children[0].data;
                  }

                  if (element.name === 'script') {
                    SCRIPTS.push(
                      `<script>${element.children[0].data}</script>`
                    );
                  }

                  // Broken after 4.0 (worked in rc)
                  // if (element.name === 'style') {
                  //   let styleTag = '<style ';
                  //   for (let key in element.attribs) {
                  //     if (key) {
                  //       styleTag += `${key}="${element.attribs[key]}">`;
                  //     }
                  //   }

                  //   styleTag += `${element.children[0].data}</style>`;
                  //   STYLES.push(styleTag);
                  // }

                  if (element.name === 'meta') {
                    count = count + 1;
                    let metaString = '<meta';
                    for (let key in element.attribs) {
                      if (key) {
                        metaString += ` ${key}="${element.attribs[key]}"`;
                      }
                    }
                    META.push(`${metaString} />\n`);
                  }

                  if (element.name === 'link') {
                    let linkString = '<link';
                    for (let key in element.attribs) {
                      if (key) {
                        linkString += ` ${key}="${element.attribs[key]}"`;
                      }
                    }
                    LINKS.push(`${linkString} />\n`);
                  }
                }

                resolve({
                  html: APP_HTML,
                  globals: {
                    styles: STYLES_STRING,
                    title: TITLE,
                    scripts: SCRIPTS.join(' '),
                    meta: META.join(' '),
                    links: LINKS.join(' ')
                  }
                });

                moduleRef.destroy();

              }, (err) => {
                // isStable subscription error (Template / code error)
                reject(err);
              });

          }, err => {
            // bootstrapModuleFactory error
            reject(err);
          });

        }, err => {
          // getFactory error
          reject(err);
        });

    } catch (ex) {
      // try/catch error
      reject(ex);
    }

  });

}

/* ********************** Private / Internal ****************** */

const factoryCacheMap = new Map<Type<{}>, NgModuleFactory<{}>>();
function getFactory(
  moduleOrFactory: Type<{}> | NgModuleFactory<{}>, compiler: Compiler
): Promise<NgModuleFactory<{}>> {
    
  return new Promise<NgModuleFactory<{}>>((resolve, reject) => {
    // If module has been compiled AoT
    if (moduleOrFactory instanceof NgModuleFactory) {
      resolve(moduleOrFactory);
      return;
    } else {
      let moduleFactory = factoryCacheMap.get(moduleOrFactory);

      // If module factory is cached
      if (moduleFactory) {
        resolve(moduleFactory);
        return;
      }

      // Compile the module and cache it
      compiler.compileModuleAsync(moduleOrFactory)
        .then((factory) => {
          factoryCacheMap.set(moduleOrFactory, factory);
          resolve(factory);
        }, (err => {
          reject(err);
        }));
    }
  });
}
