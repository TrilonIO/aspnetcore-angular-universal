import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';

const SOCKET_URL = 'ws://localhost:3005';

export interface IMessage {
    ACTION: string,
    PAYLOAD: string,
    TIME?: string
}

@Injectable()
export class SocketConnectionService {
    public messages: Subject<IMessage>;

    constructor(wsService: WebSocketService) {
        this.messages = <Subject<IMessage>>wsService
            .connect(SOCKET_URL)
            .map((response: MessageEvent): IMessage => {

                let data = JSON.parse(response.data);

                return {
                    ACTION  : data.ACTION,
                    PAYLOAD : data.PAYLOAD,
                    TIME    : data.TIME
                }

            });
    }
} 