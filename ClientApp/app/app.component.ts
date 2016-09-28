import { Component } from '@angular/core';
import { SocketConnectionService, ISocketMessage } from '../shared/websockets';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')]
})
export class AppComponent {

    private frames: ISocketMessage[] = [];

    constructor() {
        
    }
}
