
/* 
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../containers/'"

    We can just do:
        import { HomeComponent } from 'nh-containers';

    Makes life easier!
*/

export * from './websocket-test/websocket-test.component';
export * from './rest-test/rest-test.component';
export * from './home/home.component';