// tslint:disable:no-null-keyword
// tslint:disable:semicolon

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import { COUNTER_INCREASE, COUNTER_DECREASE } from '../../reducers/counter.reducer';
import { CounterState } from '../../reducers/counter.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    // public currentCount = 0;
    public counter: Observable<CounterState>;

    constructor(private _store: Store<fromRoot.State>) {
        this.counter = _store.select<CounterState>('counter')
    }

    public incrementCounter() {
        // this.currentCount++;
        this._store.dispatch({ type: COUNTER_INCREASE, payload: null })
    }

    public decreaseCounter() {
        // this.currentCount++;
        this._store.dispatch({ type: COUNTER_DECREASE, payload: null })
    }
}
