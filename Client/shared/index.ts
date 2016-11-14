
/* 
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../shared/'"

    We can just do:
        import { WebSocketService } from 'app-shared';

    Makes life easier!
*/

// Put Shared SERVICES here in /shared

export * from './cache/api';
export * from './cache/universal-cache';

export * from './http/http-gateway.service';