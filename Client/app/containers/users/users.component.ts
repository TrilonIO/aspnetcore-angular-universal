import {
    Component, OnInit,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { Http, URLSearchParams } from '@angular/http';
import { ORIGIN_URL } from '../../shared/constants/baseurl.constants';

@Component({
    selector: 'fetchdata',
    templateUrl: './users.component.html',
    animations: [
        // Animation example
        // Triggered in the ngFor with [@flyInOut]
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(-100%)' }),
                animate(1000)
            ]),
            transition('* => void', [
                animate(1000, style({ transform: 'translateY(100%)' }))
            ])
        ])
    ]
})
export class UsersComponent implements OnInit {

    public newUserName: string;
    public users: IUser[];

    // Use "constructor"s only for dependency injection
    constructor(
        private http: Http,
        @Inject(ORIGIN_URL) private baseUrl: string
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.newUserName = "";
        this.http.get(`${this.baseUrl}/api/user/all`).map(res => res.json()).subscribe(result => {
            console.log(result);
            this.users = result as IUser[];
        });
    }

    deleteUser(user) {
        this.http.delete(`${this.baseUrl}/api/user/delete/` + user.id).subscribe(result => {
            if (result.ok) {
                let position = this.users.indexOf(user);
                this.users.splice(position, 1);
            }
            else {
                alert("There was an issue, Could not delete user");
            }
        });
    }

    editUser(user) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', user.id);
        urlSearchParams.append('name', user.name);

        this.http.put(`${this.baseUrl}/api/user/update`, urlSearchParams).subscribe(result => {
            if (!result.ok) {
                alert("There was an issue, Could not edit user");
            }
        });
    }

    addUser(newUserName) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', newUserName);

        this.http.post(`${this.baseUrl}/api/user/insert`, urlSearchParams).subscribe(result => {
            if (result.ok) {
                this.users.push(result.json());
                this.newUserName = "";
            }
            else {
                alert("There was an issue, Could not edit user");
            }
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
