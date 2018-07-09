import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
  users: IUser[];
  selectedUser: IUser;

  // Use "constructor"s only for dependency injection
  constructor(private userService: UserService) {}

  // Here you want to handle anything with @Input()'s @Output()'s
  // Data retrieval / etc - this is when the Component is "ready" and wired up
  ngOnInit() {
    this.userService.getUsers().subscribe(result => {
      console.log('HttpClient [GET] /api/users/allresult', result);
      this.users = result;
    });
  }

  onSelect(user: IUser): void {
    this.selectedUser = user;
  }

  deleteUser(user) {
    this.clearUser();
    this.userService.deleteUser(user).subscribe(
      result => {
        console.log('Delete user result: ', result);
        let position = this.users.indexOf(user);
        this.users.splice(position, 1);
      },
      error => {
        console.log(`There was an issue. ${error._body}.`);
      }
    );
  }

  onUserUpdate(user: IUser) {
    this.users[this.users.findIndex(u => u.id == user.id)] = user;
  }

  addUser(newUserName) {
    this.userService.addUser(newUserName).subscribe(
      result => {
        console.log('Post user result: ', result);
        this.users.push(result);
        this.selectedUser = result;
      },
      error => {
        console.log(`There was an issue. ${error._body}.`);
      }
    );
  }

  clearUser() {
    if (this.selectedUser) {
      this.selectedUser = null;
    }
  }
}
