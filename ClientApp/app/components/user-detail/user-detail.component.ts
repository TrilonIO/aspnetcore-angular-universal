import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-detail',
  styleUrls: ['./user-detail.component.scss'],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  @Output() userUpdate: EventEmitter<any> = new EventEmitter();
  userForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl()
  });
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(user => (this.user = user));
  }
  ngOnChanges(changes: SimpleChanges) {
    this.userForm.patchValue(this.user);
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe(
      result => {
        console.log('Put user result: ', result);
      },
      error => {
        console.log(`There was an issue. ${error._body}.`);
      }
    );
    this.userUpdate.emit(this.user);
  }
}
