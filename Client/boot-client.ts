import './polyfills/browser.polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';

const rootElemTagName = 'app'; // Update this if you change your root component selector

// // Enable either Hot Module Reloading or production mode
// if (module['hot']) {
//     module['hot'].accept();
//     module['hot'].dispose(() => {
//         // Before restarting the app, we create a new root element and dispose the old one
//         const oldRootElem = document.querySelector(rootElemTagName);
//         const newRootElem = document.createElement(rootElemTagName);
//         oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
//         modulePromise.then(appModule => appModule.destroy());
//     });
// } else {
//     enableProdMode();
// }

const modulePromise = platformBrowserDynamic().bootstrapModule(BrowserAppModule);
