// tslint:disable:semicolon

import { Action } from '@ngrx/store';

// user actions
export const COUNTER_INCREASE = '[COUNTER]  increase'
export const COUNTER_DECREASE = '[COUNTER]  decrease'

export class CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export function reducer(state = initialState, action: Action): CounterState {

    switch (action.type) {
        case COUNTER_INCREASE: {
            state.value++
            return state
        }
        case COUNTER_DECREASE:
            state.value--
            return state
        default:
            return state
    }
}



