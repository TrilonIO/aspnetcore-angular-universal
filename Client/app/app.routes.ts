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

    {   // ** LAZY-LOADING EXAMPLE **
        // Notice we don't reference the file anywhere else, imports, declarations, anywhere
        // Webpack2 will provide the separate "chunk" due to System.import
        path: 'faq', 
        loadChildren : () => System.import('../containers/+faq/faq.module').then((file: any) => {
            // We use .default here since we use `export default` 
            // in the FAQModule NgModule
            return file.default;
        }) 
    },
     // loadChildren: '../containers/+faq/faq.module#FAQModule' },
    
    // All else fails - go home
    { path: '**', redirectTo: 'home' }
];
