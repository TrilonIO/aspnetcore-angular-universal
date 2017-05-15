import { compose } from "@ngrx/core";
import { combineReducers, ActionReducer } from "@ngrx/store";
import { storeFreeze } from 'ngrx-store-freeze';


import * as fromRouter from '@ngrx/router-store';
import * as fromCounter from '../reducers/counter.reducer';


// reducers
// import { notifications } from "app/_reducers/notification.reducer";
// import { intro } from "app/_reducers/intro.reducer";
// import { chat } from "app/_reducers/chat.reducer";

export interface State {
  // search: fromSearch.State;
  // books: fromBooks.State;
  // collection: fromCollection.State;
  // layout: fromLayout.State;
  router: fromRouter.RouterState;
  counter: fromCounter.CounterState;
  // notifications: NotificationList;
  // statistics: CompanyStatistics;
}


// export const reducers = {
//   user, notifications, intro, statistics, event, chat
// };


const reducers = {
  // search: fromSearch.reducer,
  // books: fromBooks.reducer,
  // collection: fromCollection.reducer,
  // layout: fromLayout.reducer,
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
