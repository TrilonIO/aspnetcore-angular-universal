import { Component, OnInit } from '@angular/core';
import { SocketConnectionService, ISocketMessage } from '../../shared/websockets';

@Component({
    selector: 'websocket-test',
    template: require('./websocket-test.component.html')
})
export class WebSocketTestComponent implements OnInit {
    public currentCount = 0;
    public frames: ISocketMessage[] = [];

    constructor(/*private socketConnection: SocketConnectionService*/) {
    }

    ngOnInit() {
        //this.socketConnection.frames.subscribe(response => {
        //    console.log('Subscribe hit!');

        //    this.frames.push(response);
        //    console.log(response);
        //});
    }

    public triggerFakeSocketEvent(msgInput) {
        alert(msgInput.value);
        
        const fakePayload: ISocketMessage = {
            ACTION: 'TEST_ACTION',
            PAYLOAD: {
                message: msgInput.value
            }
        };

        //// Push new frame to sockets
        //this.socketConnection.frames.next(fakePayload);

        msgInput.value = '';
    }
}
