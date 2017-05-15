// tslint:disable:no-null-keyword

import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';

import { COUNTER_INCREASE } from "../../reducers/counter.reducer";

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    constructor(private _store: Store<fromRoot.State>) {

    }

    public incrementCounter() {
        // this.currentCount++;
        this._store.dispatch({ type: COUNTER_INCREASE, payload: null });
    }
}
