import './polyfills/server.polyfills';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
// Grab the (Node) server-specific NgModule
import { AppServerModule } from './app/server-app.module';
// Temporary * the engine will be on npm soon (`@universal/ng-aspnetcore-engine`)
import { ngAspnetCoreEngine } from './polyfills/temporary-aspnetcore-engine';

enableProdMode();

export default createServerRenderer(params => {

    // Platform-server provider configuration
    const providers = [{
        provide: INITIAL_CONFIG,
        useValue: {
            document: '<app></app>', // Our Root application document
            url: params.url
        }
    }];

    return ngAspnetCoreEngine(providers, AppServerModule).then(response => {
        return ({
            html: response.html,
            globals: response.globals
        });
    });
});
