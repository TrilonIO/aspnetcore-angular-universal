import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

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

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'my-app-id' // make sure this matches with your Server NgModule
        }),
        BrowserAnimationsModule,
        // Our Common AppModule
        AppModule,

        SignalRModule.forRoot(createConfig)
    ],
    providers: [
        {
            // We need this for our Http calls since they'll be using APP_BASE_HREF (since the Server requires Absolute URLs)
            provide: ORIGIN_URL,
            useFactory: (getOriginUrl)
        }
    ]
})
export class BrowserAppModule {
}
