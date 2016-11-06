import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent {
    public users: IUser[];

    constructor(private http: Http) {
        this.http.get('/api/test/users').subscribe(result => {
            this.users = result.json();
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
