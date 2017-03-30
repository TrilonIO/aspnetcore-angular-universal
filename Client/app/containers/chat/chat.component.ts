import { Component, OnInit, Inject } from '@angular/core';

import { SignalR, BroadcastEventListener, SignalRConnection } from 'ng2-signalr';
import { Subscription } from "rxjs/Subscription";

export class ChatMessage {
    constructor(public user: string, public content: string) { }
}

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    public chatMessages: ChatMessage[] = [];

    private _connection: SignalRConnection;
    private _subscription: Subscription;

    constructor(private _signalR: SignalR) { }

    ngOnInit() {

        let onMessageSent$ = new BroadcastEventListener<ChatMessage>('OnMessageSent');

        this._signalR.connect().then((c) => {
            console.log(c);
            // register the listener
            c.listen(onMessageSent$);
        });

        this._subscription = onMessageSent$.subscribe((chatMessage: ChatMessage) => {
            this.chatMessages.push(chatMessage);
            console.log('chat messages', this.chatMessages);
        });

    }

}
