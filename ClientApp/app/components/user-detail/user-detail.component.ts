import { Component, Input } from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
    @Input() user: IUser;

    constructor(private userService: UserService) { }


    updateUser(user) {
        this.userService.updateUser(user).subscribe(result => {
            console.log('Put user result: ', result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }
}
