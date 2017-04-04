import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'my-app-id' // make sure this matches with your Browser NgModule
        }),
        ServerModule,
        NoopAnimationsModule,
        
        // Our Common AppModule
        AppModule 
    ]
})
export class ServerAppModule {

    // constructor(private transferState: TransferState) { }

    // // Gotcha
    // ngOnBootstrap = () => {
    //     this.transferState.inject();
    // }
}
