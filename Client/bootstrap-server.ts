import 'angular2-universal-polyfills/node';
//import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformNodeDynamic } from 'angular2-universal';
import { AppModule } from './app/app.module';

enableProdMode();

declare var Zone: any;

export default function (params: any): Promise<{ html: string, globals?: any }> {

    const doc = `
        <!DOCTYPE html>\n
        <html>
            <head></head>
            <body>
                <app></app>
            </body>
        </html>
    `;

    // hold platform reference
    var platformRef = platformNodeDynamic();

    var platformConfig = {
        ngModule: AppModule,
        document: doc,
        preboot: false,
        baseUrl: '/',
        requestUrl: params.url,
        originUrl: params.origin
    };

    // defaults
    var cancel = false;

    const _config = Object.assign({
        get cancel() { return cancel; },
        cancelHandler() { return Zone.current.get('cancel') }
    }, platformConfig);

    // for each user
    const zone = Zone.current.fork({
        name: 'UNIVERSAL request',
        properties: _config
    });


    return Promise.resolve(
        zone.run(() => {
            return platformRef.serializeModule(Zone.current.get('ngModule'))
        })
    ).then(html => {

        if (typeof html !== 'string') {
            return { html: doc };
        }
        return { html };

    }).catch(err => {

        console.log(err);
        return { html: doc };

    });

}


//const platform = platformNodeDynamic();

//export default function (params: any) : Promise<{ html: string, globals?: any }> {
//    return new Promise((resolve, reject) => {
//        const requestZone = Zone.current.fork({
//            name: 'angular-universal request',
//            properties: {
//                baseUrl: '/',
//                requestUrl: params.url,
//                originUrl: params.origin,
//                preboot: false,
//                // TODO: Render just the <app> component instead of wrapping it inside an extra HTML document
//                // Waiting on https://github.com/angular/universal/issues/347
//                'document': '<!DOCTYPE html><html><head></head><body><app></app></body></html>'
//            },
//            onHandleError: (parentZone, currentZone, targetZone, error) => {
//                // If any error occurs while rendering the module, reject the whole operation
//                reject(error);
//                return true;
//            }
//        });

//        return requestZone.run<Promise<string>>(() => platform.serializeModule(AppModule)).then(html => {
//            resolve({ html: html });
//        }, reject);
//    });
//}
