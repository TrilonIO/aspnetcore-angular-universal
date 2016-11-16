import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { HttpCacheService } from 'app-shared';

@Component({
    selector: 'app-rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent implements OnInit {
    
    public users: IUser[];

    // Use "constructor"s only for dependency injection
    constructor(private httpCache: HttpCacheService) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.httpCache.get('/api/test/users').subscribe(result => {
            this.users = result;
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
