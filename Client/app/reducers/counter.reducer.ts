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

            let newState = {
                value: state.value + 1
            }

            return newState

        }
        case COUNTER_DECREASE:

            let newState = {
                value: state.value - 1
            }

            return newState

        default:
            return state
    }
}



