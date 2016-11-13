/*
 * The main (and only) @ngrx/store reducer for the application.
 * 
 * This implements the application's core logic by handling actions
 * and producing new versions of the immutable AppState record
 * based on those actions.
 */
import { ActionReducer, Action } from '@ngrx/store';
import { List, Range } from 'immutable';
import { AppStateRecord, appStateFactory } from 'app';

// Action definitions
export const LOGIN_USER = 'LOGIN_USER'; 
export const LOGOUT_USER = 'LOGOUT_USER';

// The reducer function. Receives actions and produces new application states.
export const appReducer: ActionReducer<AppStateRecord> = (state = makeInitialState(), action: Action) => { 

  switch (action.type) {

    case LOGIN_USER:
      return state.merge({ loggedInUser: action.payload, loggedIn: true });

    case LOGOUT_USER:
      return state.merge(makeInitialState());

    default:
      return state;
  }
};

// Initial AppState, used to bootstrap the reducer.
function makeInitialState() {
  return appStateFactory({
      loggedIn: false,
      loggedInUser: {}
  });
}

