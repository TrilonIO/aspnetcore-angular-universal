import { Component, ViewEncapsulation } from '@angular/core';
import { isBrowser, isNode } from 'angular2-universal';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor() {

        if (isBrowser) {
            // With use of isBrowser or isNode you could do conditional things
            // in the different environments!

            // IE: Let's say you wanted to touch the `window` or `document`
            // This would break on the server-side, but not in the browser!
        }

    }

}