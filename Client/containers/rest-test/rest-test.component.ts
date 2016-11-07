import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ApiCacheService } from 'app-shared';

@Component({
    selector: 'rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent implements OnInit {
    public users: IUser[];

    constructor(private _apiCacheService: ApiCacheService) { }

    ngOnInit() {
        this._apiCacheService.getModel('/api/test/users').subscribe(result => {
            console.log('AFTER SUBSCRIBE');
            console.log(result);
            this.users = result;
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
