
/* 
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../containers/'"

    We can just do:
        import { HomeComponent } from 'app-containers';

    Makes life easier!
*/

export * from './rest-test/rest-test.component';
export * from './home/home.component';
export * from './bootstrap/bootstrap.component';
export * from './login/login.component';
export * from './platform-examples/examples.component';
