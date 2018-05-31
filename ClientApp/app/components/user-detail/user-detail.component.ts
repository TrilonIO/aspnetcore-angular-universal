import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userForm.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(user => this.user = user);
    }
    ngOnChanges(changes: SimpleChanges) {
        this.userForm.patchValue(this.user);
    }

    updateUser() {
        this.userService.updateUser(this.userForm.value).subscribe(result => {
            console.log('Put user result: ', result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
        this.userUpdate.emit(this.user);
    }
}
