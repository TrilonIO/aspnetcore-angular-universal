﻿import {
    Component, OnInit,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/users.service';

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
    constructor(private userService: UserService) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.newUserName = '';
        this.userService.getUsers().subscribe(result => {
            console.log('Get user result: ', result);
            console.log('TransferHttp [GET] /api/users/allresult', result);
            this.users = result as IUser[];
        });
    }

    deleteUser(user) {
        this.userService.deleteUser(user).subscribe(result => {
            console.log('Delete user result: ', result);
            if (result.ok) {
                let position = this.users.indexOf(user);
                this.users.splice(position, 1);
            } else {
                alert('There was an issue, Could not delete user');
            }
        });
    }

    updateUser(user) {
        this.userService.updateUser(user).subscribe(result => {
            console.log('Put user result: ', result);
            if (!result.ok) {
                alert('There was an issue, Could not edit user');
            }
        });
    }

    addUser(newUserName) {
        this.userService.addUser(newUserName).subscribe(result => {
            console.log('Post user result: ', result);
            if (result.ok) {
                this.users.push(result.json());
                this.newUserName = '';
            } else {
                alert('There was an issue, Could not edit user');
            }
        });
    }
}
