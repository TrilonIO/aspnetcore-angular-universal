
/* 
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../shared/'"

    We can just do:
        import { XhrService } from 'nh-shared';

    Makes life easier!
*/

export * from './websockets/socketconnection.service';
export * from './websockets/websocket.service';

export * from './xhr/xhr.service';