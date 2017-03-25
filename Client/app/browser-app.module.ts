import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id'
        }),
        AppModule
    ]
})
export class AppBrowserModule {
}
