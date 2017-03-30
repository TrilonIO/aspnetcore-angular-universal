import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

let signalrConfiguration = new SignalRConfiguration();
signalrConfiguration.hubName = 'Ng2SignalRHub';
signalrConfiguration.logging = true;
signalrConfiguration.url = 'http://ng2-signalr-backend.azurewebsites.net/';
signalrConfiguration.qs = { user: 'donald' };

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id'
        }),
        AppModule,
        SignalRModule.forRoot(() => signalrConfiguration)
    ]
})
export class AppBrowserModule {
}
