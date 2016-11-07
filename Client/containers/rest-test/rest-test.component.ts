import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ApiService } from '../../app/api';

@Component({
    selector: 'rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent implements OnInit {
    public users: IUser[];

    constructor(private _apiService: ApiService) { }

    ngOnInit() {
        this._apiService.getModel('/api/test/users').subscribe(result => {
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
