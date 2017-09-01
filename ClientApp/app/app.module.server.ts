import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';
import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { TransferState } from '../modules/transfer-state/transfer-state';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id' // make sure this matches with your Browser NgModule
    }),
    ServerModule,
    NoopAnimationsModule,

    ServerTransferStateModule,

    // Our Common AppModule
    AppModuleShared
  ]
})
export class AppModule {

  constructor(private transferState: TransferState) { }

  // Gotcha (needs to be an arrow function)
  ngOnBootstrap = () => {
    this.transferState.inject();
  }
}
