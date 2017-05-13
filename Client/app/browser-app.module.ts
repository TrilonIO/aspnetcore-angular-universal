import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

// ngrx store
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { REQUEST } from './shared/constants/request';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';
import { reducer } from './reducers';

export function createConfig(): SignalRConfiguration {
    const signalRConfig = new SignalRConfiguration();

    signalRConfig.hubName = 'Ng2SignalRHub';
    signalRConfig.qs = { user: 'donald' };
    signalRConfig.url = 'http://ng2-signalr-backend.azurewebsites.net/';
    signalRConfig.logging = true;

    return signalRConfig;
}

export function getOriginUrl() {
    return window.location.origin;
}

export function getRequest() {
    // the Request object only lives on the server
    return { cookie: document.cookie };
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'my-app-id' // make sure this matches with your Server NgModule
        }),
        BrowserAnimationsModule,
        BrowserTransferStateModule,

        // Our Common AppModule
        AppModule,

        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),

        SignalRModule.forRoot(createConfig)
    ],
    providers: [
        {
            // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
            // (Also remember the Server requires Absolute URLs)
            provide: ORIGIN_URL,
            useFactory: (getOriginUrl)
        }, {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: (getRequest)
        }
    ]
})
export class BrowserAppModule {
}
