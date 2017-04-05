import 'zone.js/dist/zone-node';
import './polyfills/server.polyfills';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

import { ORIGIN_URL } from './app/shared/constants/baseurl.constants';
// Grab the (Node) server-specific NgModule
import { ServerAppModule } from './app/server-app.module';
// Temporary * the engine will be on npm soon (`@universal/ng-aspnetcore-engine`)
import { ngAspnetCoreEngine } from './polyfills/temporary-aspnetcore-engine';

enableProdMode();

export default createServerRenderer(params => {

    // Platform-server provider configuration
    const providers = [
        {
            provide: INITIAL_CONFIG,
            useValue: {
                document: '<app></app>', // Our Root application document
                url: params.url
            }
        }, {
            provide: ORIGIN_URL,
            useValue: params.origin
        }
    ];

    return ngAspnetCoreEngine(providers, ServerAppModule).then(response => {
        return ({
            html: response.html,
            globals: response.globals
        });
    });
});
