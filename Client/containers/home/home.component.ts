import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-home',
    template: require('./home.component.html')
})
export class HomeComponent implements OnInit {

    // Use "constructor"s only for dependency injection
    constructor () {}

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {

    }
}
