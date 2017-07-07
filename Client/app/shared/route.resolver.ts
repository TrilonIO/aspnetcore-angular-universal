import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { SignalR, ISignalRConnection } from 'ng2-signalr';

@Injectable()
export class ConnectionResolver implements Resolve<ISignalRConnection> {

    constructor(private _signalR: SignalR) { }

    resolve() {
        console.log('ConnectionResolver. Resolving...');
        return this._signalR.connect();
    }
} 
