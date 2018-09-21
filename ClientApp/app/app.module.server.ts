import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { PrebootModule } from 'preboot';
import { AppComponent } from './app.component';
import { AppModuleShared } from './app.module';

import { TransferHttpCacheModule, StateTransferInitializerModule } from '@nguniversal/common';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Our Common AppModule
    AppModuleShared,

    ServerModule,
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    NoopAnimationsModule,

    TransferHttpCacheModule, // still needs fixes for 5.0
    //   Leave this commented out for now, as it breaks Server-renders
    //   Looking into fixes for this! - @MarkPieszak
    // StateTransferInitializerModule // <-- broken for the time-being with ASP.NET
  ]
})
export class AppModule {
  constructor() {}
}
