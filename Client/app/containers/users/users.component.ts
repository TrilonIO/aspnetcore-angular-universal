import {
    Component, OnInit,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { Http, URLSearchParams } from '@angular/http';
import { ORIGIN_URL } from '../../shared/constants/baseurl.constants';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';

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
        private transferHttp: TransferHttp, // Use only for GETS that you want re-used between Server render -> Client render
        private http: Http, // Use for everything else
        @Inject(ORIGIN_URL) private baseUrl: string
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {

        this.newUserName = '';

        // ** TransferHttp example / concept **
        //    - Here we make an Http call on the server, save the result on the window object and pass it down with the SSR,
        //      The Client then re-uses this Http result instead of hitting the server again!

        //  NOTE : transferHttp also automatically does .map(res => res.json()) for you, so no need for these calls
        this.transferHttp.get(`${this.baseUrl}/api/user/all`).subscribe(result => {
            console.log('TransferHttp [GET] /api/user/allresult', result);
            this.users = result as IUser[];
        });
    }

    deleteUser(user) {
        this.http.delete(`${this.baseUrl}/api/user/delete/` + user.id).subscribe(result => {
            if (result.ok) {
                let position = this.users.indexOf(user);
                this.users.splice(position, 1);
            } else {
                alert('There was an issue, Could not delete user');
            }
        });
    }

    editUser(user) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', user.id);
        urlSearchParams.append('name', user.name);

        this.http.put(`${this.baseUrl}/api/user/update`, urlSearchParams).subscribe(result => {
          console.log('result: ', result);
            if (!result) {
                alert('There was an issue, Could not edit user');
            }
        });
    }

    addUser(newUserName) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', newUserName);

        this.http.post(`${this.baseUrl}/api/user/insert`, urlSearchParams).subscribe(result => {
            if (result) {
                this.users.push(result.json());
                this.newUserName = '';
            } else {
                alert('There was an issue, Could not edit user');
            }
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
