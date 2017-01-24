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
    { path: 'home', component: HomeComponent, data: { title: 'Home'} },
    { path: 'bootstrap', component: BootstrapComponent, data: { title: 'Bootstrap Examples'} },
    { path: 'rest-test', component: RestTestComponent, data: { title: 'WebAPI Examples'} },
    { path: 'login', component: LoginComponent, data: { title: 'Login'} },
    { path: 'examples', component: ExamplesComponent, data: { title: 'Platform Examples'} },

    {   // ** LAZY-LOADING EXAMPLE **
        // Notice we don't reference the file anywhere else, imports, declarations, anywhere
        // Webpack2 will provide the separate "chunk" due to System.import
        path: 'faq', 
        loadChildren : () => System.import('../containers/+faq/faq.module').then((file: any) => {
            // We use .default here since we use `export default` 
            // in the FAQModule NgModule
            return file.default;
        }),
        data: { title: 'FAQ'}
    },
     // loadChildren: '../containers/+faq/faq.module#FAQModule' },
    
    // All else fails - go home
    { path: '**', redirectTo: 'home' }
];
