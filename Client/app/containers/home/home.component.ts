import { Component, OnInit, Inject } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    title: string = 'Angular 4.0 Universal & ASP.NET Core advanced starter-kit';

    // Use "constructor"s only for dependency injection
    constructor () {
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {

    }
}
