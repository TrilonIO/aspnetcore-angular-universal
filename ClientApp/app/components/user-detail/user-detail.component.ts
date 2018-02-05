import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
    @Input() user: IUser;
    @Output() userUpdate: EventEmitter<any> = new EventEmitter();
    constructor(private userService: UserService) { }


    updateUser(user) {
        this.userService.updateUser(user).subscribe(result => {
            console.log('Put user result: ', result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
          });
      this.userUpdate.emit(null);
    }
}
