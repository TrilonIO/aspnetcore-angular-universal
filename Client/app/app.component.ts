import { Component, ViewEncapsulation } from '@angular/core';
import { SocketConnectionService, ISocketMessage } from '../shared';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    private frames: ISocketMessage[] = [];

    constructor() {
        if (isBrowser) {
            // example
            // alert('yay');
        }
    }

}
