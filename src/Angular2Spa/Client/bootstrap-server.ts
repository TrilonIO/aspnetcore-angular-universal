import 'angular2-universal-polyfills/node';
import './__2.1.1.workaround.ts';
import 'zone.js';

import { enableProdMode } from '@angular/core';
import { platformNodeDynamic } from 'angular2-universal';

import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

// Grab the (Node) server-specific NgModule
import { AppServerModule } from './app/platform-modules/app.server.module';
import { metaStore } from 'app-shared';

enableProdMode();

const platform = platformNodeDynamic();

export default createServerRenderer(params => {

    // Our Root application document
    const doc = '<app-root></app-root>';

    return new Promise<RenderResult>((resolve, reject) => {
        const requestZone = Zone.current.fork({
            name: 'Angular-Universal Request',
            properties: {
                ngModule: AppServerModule,
                baseUrl: '/',
                requestUrl: params.url,
                originUrl: params.origin,
                preboot: false,
                document: doc
            },
            onHandleError: (parentZone, currentZone, targetZone, error) => {
                // If any error occurs while rendering the module, reject the whole operation
                reject(error);
                return true;
            }
        });

        return requestZone.run<Promise<string>>(() => platform.serializeModule(AppServerModule)).then(html => {
            resolve({ html: html, globals: metaStore });
        }, reject);
    });
});




// export default function (params: IParams): Promise<{ html: string, globals?: any }> {

//     // Our Root application document
//     const doc = '<app-root></app-root>';

//     // hold platform reference
//     const platformRef = platformNodeDynamic();

//     let platformConfig = {
//         ngModule: AppServerModule,
//         document: doc,
//         preboot: false,
//         baseUrl: '/',
//         requestUrl: params.url,
//         originUrl: params.origin
//     };

//     // defaults
//     let cancel = false;

//     const _config = Object.assign({
//         get cancel() { return cancel; },
//         cancelHandler() { return Zone.current.get('cancel'); }
//     }, platformConfig);

//     // for each user
//     const zone = Zone.current.fork({
//         name: 'UNIVERSAL request',
//         properties: _config
//     });


//     return Promise.resolve(
//         zone.run(() => {
//             return platformRef.serializeModule(Zone.current.get('ngModule'));
//         })
//     ).then(html => {

//         // Something went wrong, return the original blank document at least
//         if (typeof html !== 'string') {
//             return { html: doc };
//         }

//         /*  Successfully serialized Application
//          *  You can pass "Globals" here if you want to pass some data to every request
//          *  (also you could pass in params.data if you want to pass data from the server that came through the Views/Index.cshtml page
//          *   inside of the asp-prerender-data="" attribute
//          *      globals: params.data
//          */
//         return { html, globals: metaStore };

//     }).catch(err => {

//         console.log(err);
//         return { html: doc };

//     });

// }

// export interface IParams {
//     origin: string;
//     url: string;
//     absoluteUrl: string;
//     data: {}; // custom user data sent from server (through asp-prerender-data="" attribute on index.cshtml)
// }
