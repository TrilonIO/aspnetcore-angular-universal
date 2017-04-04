import './polyfills/server.polyfills';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
// Grab the (Node) server-specific NgModule
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
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
            provide: APP_BASE_HREF,
            useValue: params.origin
        }
    ];

    return ngAspnetCoreEngine(providers, ServerAppModuleNgFactory).then(response => {
        return ({
            html: response.html,
            globals: response.globals
        });
    });
});

/* -------- THIS FILE IS TEMPORARY and will be gone when @ngtools/webpack can handle dual files (w server) ---------- */
