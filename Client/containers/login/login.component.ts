import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { AppState, LOGIN_USER } from 'app';

// Demo model
export class UserModel {
    username: string;
    password: string;
}

@Component({
    selector: 'app-login',
    template: `
        <form (ngSubmit)="submitUser()" #loginForm="ngForm">
            <div class="form-group">
                <label for="username">Username:</label>
                <input [(ngModel)]="user.username" name="username" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input [(ngModel)]="user.password" name="password" type="password" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Login</button>
            
        </form>
    `
})
export class LoginComponent {

    user: UserModel = new UserModel();

    constructor(private router: Router, private store: Store<AppState>) {}

    submitUser () {

        this.store.dispatch({
            type: LOGIN_USER,
            payload: this.user
        });

        this.router.navigate(['/']);
    }

}
