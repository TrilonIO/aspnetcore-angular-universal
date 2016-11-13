import './__2.1.1.workaround.ts';
import 'angular2-universal-polyfills/node';

import { enableProdMode } from '@angular/core';
import { platformNodeDynamic } from 'angular2-universal';

// Grab the (Node) server-specific NgModule
import { AppServerModule } from './app/platform-modules/app.server.module';

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
    const platformRef = platformNodeDynamic();

    let platformConfig = {
        ngModule: AppServerModule,
        document: doc,
        preboot: false,
        baseUrl: '/',
        requestUrl: params.url,
        originUrl: params.origin
    };

    // defaults
    let cancel = false;

    const _config = Object.assign({
        get cancel() { return cancel; },
        cancelHandler() { return Zone.current.get('cancel'); }
    }, platformConfig);

    // for each user
    const zone = Zone.current.fork({
        name: 'UNIVERSAL request',
        properties: _config
    });


    return Promise.resolve(
        zone.run(() => {
            return platformRef.serializeModule(Zone.current.get('ngModule'));
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
