import 'zone.js/dist/zone-node';
import './polyfills/server.polyfills';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

import { ORIGIN_URL } from './app/shared/constants/baseurl.constants';
// Grab the (Node) server-specific NgModule
import { AppModule } from './app/app.module.server';
// Temporary * the engine will be on npm soon (`@universal/ng-aspnetcore-engine`)
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from './polyfills/temporary-aspnetcore-engine';

enableProdMode();

export default createServerRenderer((params) => {

  // Platform-server provider configuration
  const setupOptions: IEngineOptions = {
    appSelector: '<app></app>',
    ngModule: AppModule,
    request: params,
    providers: [
      // Optional - Any other Server providers you want to pass (remember you'll have to provide them for the Browser as well)
    ]
  };

  return ngAspnetCoreEngine(setupOptions).then(response => {
    // Apply your transferData to response.globals
    response.globals.transferData = createTransferScript({
      someData: 'Transfer this to the client on the window.TRANSFER_CACHE {} object',
      fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
    });

    return ({
      html: response.html,
      globals: response.globals
    });
  });
});
