/*
 * Model definition for the (immutable) application state.
 */
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { List } from 'immutable';

// The TypeScript interface that defines the application state's properties.
// This is to be imported wherever a reference to the app state is used
// (reducers, components, services...) 
export interface AppState {
    loggedIn: boolean;
    loggedInUser: {};
}

// An Immutable.js Record implementation of the AppState interface.
// This only needs to be imported by reducers, since they produce new versions
// of the state. Components should only ever read the state, never change it,
// so they should only need the interface, not the record. 
export interface AppStateRecord extends TypedRecord<AppStateRecord>, AppState { }

// An Immutable.js record factory for the record.
export const appStateFactory = makeTypedFactory<AppState, AppStateRecord>({
    loggedIn : false,
    loggedInUser: {}
});
