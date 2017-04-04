﻿import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SignalR, BroadcastEventListener, SignalRConnection } from 'ng2-signalr';
import { Subscription } from 'rxjs/Subscription';

export class ChatMessage {
    constructor(public user: string, public content: string) { }
}

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    public chatMessages: ChatMessage[] = [];

    private _connection: SignalRConnection;
    private _subscription: Subscription;

    constructor(route: ActivatedRoute) {
        this._connection = route.snapshot.data['connection'];
    }

    ngOnInit() {
        const onMessageSent$ = new BroadcastEventListener<ChatMessage>('OnMessageSent');
        this._connection.listen(onMessageSent$);
        this._subscription = onMessageSent$.subscribe((chatMessage: ChatMessage) => {
            this.chatMessages.push(chatMessage);
            console.log('chat messages', this.chatMessages);
        });
    }

    // send chat message to server
    sendMessage(user, message) {
        console.log('send message', user, message);
        this._connection.invoke('Chat', new ChatMessage(user, message))
            .catch((err: any) => console.log('Failed to invoke', err));
    }

}
