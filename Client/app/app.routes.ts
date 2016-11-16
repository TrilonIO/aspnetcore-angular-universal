import { Route } from '@angular/router';

// Container (aka: "pages") imports
import {
    HomeComponent,
    RestTestComponent,
    BootstrapComponent,
    LoginComponent,
    ExamplesComponent
} from 'app-containers';

export const ROUTES: Route[] = [
    // Base route
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Other routes
    { path: 'home', component: HomeComponent },
    { path: 'bootstrap', component: BootstrapComponent },
    { path: 'rest-test', component: RestTestComponent },
    { path: 'login', component: LoginComponent },
    { path: 'examples', component: ExamplesComponent },

    // All else fails - go home
    { path: '**', redirectTo: 'home' }
];
