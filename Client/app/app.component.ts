import { Component, ViewEncapsulation } from '@angular/core';
import { isBrowser, isNode } from 'angular2-universal';

@Component({
    selector: 'app',
    template: `
        <div class="container-fluid">
            <app-nav-menu></app-nav-menu>
            <router-outlet></router-outlet>
        </div>
    `,
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
