import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-examples',
    template: `
        <h1>Platform specific examples</h1>

        <blockquote>
            With Universal, we can decide which logic we want to run in "what" situation (or platform).
            Certain things, we <strong>don't</strong> want running on the server:<br><br>

            timeouts, intervals, references to window/document/navigator, etc...
            <br><br>

            We want to use platform detecting logic from Universal such as <strong>isBrowser | isNode</strong> to wrap<br>
            around these things.
        </blockquote>

        <h3>Counter example = {{ browserPlatformInterval | async}}</h3>

        <blockquote>
            We can't let an "interval" run on the server, for it would loop endlessly and we'd never get a paint.<br>
            In a situation like this we used "isBrowser" from Universal to wrap our logic per platform.
        </blockquote>
    `
})
export class ExamplesComponent implements OnInit {

    browserPlatformInterval: Observable<any>;
    
    // Use "constructor"s only for dependency injection
    constructor () {}

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {
        /*
         * Platform specific -Example- :: 
         * We don't want an interval to continuously run on the server (it will just timeout the server) or delay our response.
         * So avoid having things like "interval" run on the server. With Universal's "isBrowser" we can have it only run there.
         */
        if (isBrowser) {
            this.browserPlatformInterval = Observable.interval(300);
        }
    }
    
}
