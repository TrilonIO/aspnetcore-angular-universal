import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        NoopAnimationsModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id'
        }),
        ServerModule,
        AppModule
    ]
})
export class AppServerModule {

    // constructor(private transferState: TransferState) { }

    // // Gotcha
    // ngOnBootstrap = () => {
    //     this.transferState.inject();
    // }
}
