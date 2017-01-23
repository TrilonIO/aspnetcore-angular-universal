import { Component, OnInit, Inject } from '@angular/core';


@Component({
    selector: 'app-notFound',
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit
{
    // Use "constructor"s only for dependency injection
    constructor (@Inject('isBrowser') private isBrowser: boolean) {
        // Example of how to Inject the isBrowser/isNode we injected in our app.browser & app.server NgModules 
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit ()
    {
        console.log('Are we inside the Browser ? ' + this.isBrowser);
    }
}
