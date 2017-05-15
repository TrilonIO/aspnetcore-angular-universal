import { compose } from "@ngrx/core";
import { combineReducers, ActionReducer } from "@ngrx/store";
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromRouter from '@ngrx/router-store';
import * as fromCounter from '../reducers/counter.reducer';

export interface State {
  router: fromRouter.RouterState;
  counter: fromCounter.CounterState;
}

const reducers = {
  router: fromRouter.routerReducer,
  counter: fromCounter.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  // if (environment.production) {
  //   return productionReducer(state, action);
  // } else {
  return developmentReducer(state, action);
  // }
}
