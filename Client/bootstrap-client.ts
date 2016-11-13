import './__2.1.1.workaround.ts'; // temporary until 2.1.1 things are patched in Core
import 'angular2-universal-polyfills/browser'; // This needs to be at the top, Universal neccessary polyfills

import { enableProdMode } from '@angular/core';
// We're going to let Universal take over the Clients "bootstrap" (instead of the normal platformBrowserDynamic)
import { platformUniversalDynamic } from 'angular2-universal';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// HMR state management 
import { handleHmr } from 'app';
// Grab the browser-specific NgModule
import { AppBrowserModule } from './app/platform-modules/app.browser.module';

let platform;

if ('production' === process.env.ENV) {
  enableProdMode();
  platform = platformUniversalDynamic();
} else {
  // Development mode
  platform = platformBrowserDynamic();
}

// Boot the application normally
const bootApplication = () => platform.bootstrapModule(AppBrowserModule);

// HMR bootstrap overload
const hmrBootstrap = () => { handleHmr(module, bootApplication); };

if ((<any>module).hot) {
    hmrBootstrap();
} else {
    bootApplication();
}

