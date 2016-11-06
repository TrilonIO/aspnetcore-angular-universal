import { Route } from '@angular/router';

// Container (aka: "pages") imports
import {
    HomeComponent,
    WebSocketTestComponent,
    RestTestComponent,
    BootstrapComponent
} from '../containers';

export const ROUTES : Route[] = [
    // Base route
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Other routes
    { path: 'home', component: HomeComponent },
    { path: 'bootstrap', component: BootstrapComponent },
    { path: 'rest-test', component: RestTestComponent },
    { path: 'websocket-test', component: WebSocketTestComponent },

    // All else fails - go home
    { path: '**', redirectTo: 'home' }
]