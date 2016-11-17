import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
// for AoT we need to manually split universal packages (/browser & /node)
import { UniversalModule, isBrowser, isNode, AUTO_PREBOOT } from 'angular2-universal/browser';

import { AppCommonModule } from './app.common.module';
import { AppComponent } from 'app';
// Universal : XHR Cache 
import { CacheService } from 'app-shared';

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

export function getRequest() {
  return {};
}
export function getResponse() {
  return {};
}

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        // "UniversalModule" Must be first import.
        // ** NOTE ** : This automatically imports BrowserModule, HttpModule, and JsonpModule for Browser,
        // and NodeModule, NodeHttpModule etc for the server.
        UniversalModule, 

        AppCommonModule,

        // NgRx
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    providers: [
        // Angular -Universal- providers below ::
        { provide: 'isBrowser', useValue: isBrowser }, 
        { provide: 'isNode', useValue: isNode },
        { provide: 'req', useFactory: getRequest },
        { provide: 'res', useFactory: getResponse }
        // Universal concept. Uncomment this if you want to Turn OFF auto preboot complete
        // { provide: AUTO_PREBOOT, useValue: false } 

        // Other providers you want to add that you don't want shared in "Common" but are browser only
    ]
})
export class AppBrowserModule {

    constructor(public cache: CacheService) {
        this.doRehydrate();
    }

    // Universal Cache "hook"
    doRehydrate() {
        let defaultValue = {};
        let serverCache = this._getCacheValue(CacheService.KEY, defaultValue);
        this.cache.rehydrate(serverCache);
    }

    // Universal Cache "hook
    _getCacheValue(key: string, defaultValue: any): any {
        // Get cache that came from the server
        const win: any = window;
        if (win[UNIVERSAL_KEY] && win[UNIVERSAL_KEY][key]) {
            let serverCache = defaultValue;
            try {
                serverCache = JSON.parse(win[UNIVERSAL_KEY][key]);
                if (typeof serverCache !== typeof defaultValue) {
                    console.log('Angular Universal: The type of data from the server is different from the default value type');
                    serverCache = defaultValue;
                }
            } catch (e) {
                console.log('Angular Universal: There was a problem parsing the server data during rehydrate');
                serverCache = defaultValue;
            }
            return serverCache;
        } else {
            console.log('Angular Universal: UNIVERSAL_CACHE is missing');
        }
        return defaultValue;
    }
}
