import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, LOGOUT_USER } from 'app';

@Component({
    selector: 'app-nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    
    loggedIn$: {};
    user$: {};

    constructor(private store: Store<AppState>) {
        store.select('loggedIn').subscribe(loggedIn => {
            this.loggedIn$ = loggedIn;  
        });

        store.select('loggedInUser').subscribe(user => {
            this.user$ = user;
        });
    }

    logout() {
        this.store.dispatch({ type: LOGOUT_USER });
    }
}
