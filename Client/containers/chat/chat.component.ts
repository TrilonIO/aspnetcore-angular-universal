import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChannelService, ConnectionState } from 'app-shared';

import * as $ from 'jquery'; 

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    // An internal "copy" of the connection state stream used because
    //  we want to map the values of the original stream. If we didn't 
    //  need to do that then we could use the service's observable 
    //  right in the template.
    //   
    connectionState$: Observable<string>;

    // Use "constructor"s only for dependency injection
    constructor (
        @Inject('isBrowser') private isBrowser: boolean,
        @Optional() private channelService: ChannelService
    ) {
        // Example of how to Inject the isBrowser/isNode we injected in our app.browser & app.server NgModules 
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {
        console.log('Are we inside the Browser ? ' + this.isBrowser);
        console.log(this.channelService);

        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error('errors$ error', error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(
            () => { console.log('signalr service has been started'); },
            () => { console.warn('signalr service failed to start!'); }
        );
    }
}
