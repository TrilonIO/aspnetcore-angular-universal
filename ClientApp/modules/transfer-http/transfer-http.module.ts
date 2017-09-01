import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { TransferHttp } from './transfer-http';

@NgModule({
  providers: [
    TransferHttp
  ]
})
export class TransferHttpModule {}
