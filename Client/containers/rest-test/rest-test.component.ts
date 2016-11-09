import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { HttpCacheService } from 'app-shared';

@Component({
    selector: 'app-rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent implements OnInit {
    public users: IUser[];

    constructor(private httpCache: HttpCacheService) { }

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
