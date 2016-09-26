import { Component } from '@angular/core';
import { SocketConnectionService, ISocketMessage } from '../../shared/websockets';

@Component({
    selector: 'counter',
    template: require('./counter.component.html')
})
export class CounterComponent {
    public currentCount = 0;

    constructor(private socketConnection: SocketConnectionService) {
        // socketConnection.frames

        socketConnection.frames.subscribe(response => {
            this.frames.push(response);
            console.log(response);
        });

        const fakePayload: ISocketMessage = {
            ACTION: 'TEST_ACTION',
            PAYLOAD: {
                test : 123
            }
        };

        // Push new frame to sockets
        this.socketConnection.frames.next(fakePayload);
    }

    public incrementCounter() {
        this.currentCount++;
    }
}
