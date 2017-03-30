import { Component, OnInit, Inject } from '@angular/core';

import { SignalR } from 'ng2-signalr';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    constructor(private _signalR: SignalR) { }

    ngOnInit() {

        this._signalR.connect().then((c) => {
            console.log(c);
        });

    }

}
