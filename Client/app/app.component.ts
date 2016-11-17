import { Component, ViewEncapsulation, Inject } from '@angular/core';
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

    constructor(@Inject('req') req: any, @Inject('res') res: any) {
        console.log('req',  req);
        console.log('res',  res);
    }

}
