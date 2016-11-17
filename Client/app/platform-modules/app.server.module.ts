
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
// for AoT we need to manually split universal packages (/browser & /node)
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node';

import { AppCommonModule } from './app.common.module';
import { AppComponent } from 'app';
// Universal : XHR Cache 
import { CacheService } from 'app-shared';

export function getRequest() {
  return Zone.current.get('req') || {};
}
export function getResponse() {
  return Zone.current.get('res') || {};
}

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        // "UniversalModule" Must be first import.
        // ** NOTE ** : This automatically imports BrowserModule, HttpModule, and JsonpModule for Browser,
        // and NodeModule, NodeHttpModule etc for the server.
        UniversalModule, 

        AppCommonModule
    ],
    providers: [
        // Can be used inside Components within the app to declaritively run code
        // depending on the platform it's in
        { provide: 'isBrowser', useValue: isBrowser },
        { provide: 'isNode', useValue: isNode },
        { provide: 'req', useFactory: getRequest },
        { provide: 'res', useFactory: getResponse }

        // Other providers you want to add that you don't want shared in "Common" but are browser only
    ]
})
export class AppServerModule {

    constructor(public cache: CacheService) { }

    /** Universal Cache "hook"
     * We need to use the arrow function here to bind the context as this is a gotcha
     * in Universal for now until it's fixed
     */
    universalDoDehydrate = (universalCache) => {
        console.log('universalDoDehydrate ****');
        universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
    }

    /** Universal Cache "hook"
     * Clear the cache after it's rendered
     */
    universalAfterDehydrate = () => {
        this.cache.clear();
    }
}
