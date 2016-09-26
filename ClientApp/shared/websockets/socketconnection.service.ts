import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';

const scheme = document.location.protocol == "https:" ? "wss" : "ws";
const port = document.location.port ? (":" + document.location.port) : "";

// const SOCKET_URL = 'ws://localhost:53223/ws/websocket';
const SOCKET_URL = scheme + "://" + document.location.hostname + port + '/ws';

console.log(SOCKET_URL);

export interface ISocketMessage {
    ACTION: string,
    PAYLOAD: any,
    TIME?: string
}

@Injectable()
export class SocketConnectionService {
    public frames: Subject<ISocketMessage>;

    constructor(wsService: WebSocketService) {
        this.frames = <Subject<ISocketMessage>>wsService
            .connect(SOCKET_URL)
            .map((response: MessageEvent): ISocketMessage => {

                console.log('RESPONSE CAME BACK?\n');
                console.log(response);

                let data = JSON.parse(response.data);

                return {
                    ACTION  : data.ACTION,
                    PAYLOAD : data.PAYLOAD,
                    TIME    : data.TIME
                }

            });
    }
} 