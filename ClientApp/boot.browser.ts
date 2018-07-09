import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module.browser';
import './polyfills/browser.polyfills';

// // Enable either Hot Module Reloading or production mode
if (module['hot']) {
  module['hot'].accept();
  module['hot'].dispose(() => {
    modulePromise.then(appModule => appModule.destroy());
  });
} else {
  enableProdMode();
}

const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);
