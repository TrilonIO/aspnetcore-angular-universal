import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModuleShared } from './app.module';



@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Our Common AppModule
    AppModuleShared,

    ServerModule,
    NoopAnimationsModule,

    // HttpTransferCacheModule still needs fixes for 5.0
    //   Leave this commented out for now, as it breaks Server-renders
    //   Looking into fixes for this! - @MarkPieszak
    // ServerTransferStateModule // <-- broken for the time-being with ASP.NET
  ]
})
export class AppModule {

  constructor() { }

}
