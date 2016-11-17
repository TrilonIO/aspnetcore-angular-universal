

/* 
    This is our "Barrels" index
    Here we can just export all individual things (in this folder)

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../app/'"

    We can just do:
        import { AppState } from 'app';

    Makes life easier!
*/

export * from './app.component';
export * from './app.routes';

export * from './state/app.reducer';
export * from './state/app-state';
export * from './state/hmr';

export * from './shared-module/base.shared.module';

