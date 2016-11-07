import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// for AoT we need to manually split universal packages (/browser & /node)
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/browser';

// Universal : XHR Cache
import { CacheService } from './universal-cache';
import { ApiService } from './api';
export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

// Bootstrap (non-jQuery implementation)
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Main "APP" Root Component
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

// Component imports
import { NavMenuComponent } from 'app-components';

// Container (aka: "pages") imports
import { 
    HomeComponent,
    WebSocketTestComponent,
    RestTestComponent,
    BootstrapComponent
} from 'app-containers';

// Provider (aka: "shared" | "services") imports
import { SocketConnectionService, WebSocketService } from 'app-shared';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, 
        NavMenuComponent,
        RestTestComponent,
        WebSocketTestComponent,
        HomeComponent,
        BootstrapComponent
    ],
    providers: [
        { provide: 'isBrowser', useValue: isBrowser },
        { provide: 'isNode', useValue: isNode },
        CacheService,
        ApiService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.

        // Here we can import other stuff
        // Even make it dynamic whether it's for Browser or Server (Dependency Injection)
        // isBrowser ? something : somethingElse, <- basic pseudo example

        FormsModule,
        Ng2BootstrapModule,

        RouterModule.forRoot(ROUTES)
    ]
})
export class AppModule {
    constructor(public cache: CacheService) {
        // TODO(gdi2290): refactor into a lifecycle hook
        this.doRehydrate();
    }

    doRehydrate() {
        console.log('DO REHYDRATE');
        let defaultValue = {};
        let serverCache = this._getCacheValue(CacheService.KEY, defaultValue);
        this.cache.rehydrate(serverCache);
    }

    _getCacheValue(key: string, defaultValue: any): any {
        console.log('_getCacheValue for ' + key)
        console.log(window[UNIVERSAL_KEY]);
        // browser
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
