import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { SignalR, ISignalRConnection } from 'ng2-signalr';

@Injectable()
export class ConnectionResolver implements Resolve<ISignalRConnection> {

    constructor(
      private _signalR: SignalR,
      private _router: Router
    ) { }

    resolve(): Promise<any> {
      return this._signalR.connect().then((item) => {
          return item;
      }).catch(() => {
          return this._router.navigate(['/']);
      });
    }
}
