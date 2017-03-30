import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.hubName = 'Ng2SignalRHub';
    c.qs = { user: 'donald' };
    c.url = 'http://ng2-signalr-backend.azurewebsites.net/';
    c.logging = true;
    return c;
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id'
        }),
        AppModule,
        SignalRModule.forRoot(() => createConfig())
    ]
})
export class AppBrowserModule {
}
