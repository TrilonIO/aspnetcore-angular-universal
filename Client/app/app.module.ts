import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { NavMenuComponent } from './containers/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { FetchDataComponent } from './containers/fetchdata/fetchdata.component';
import { CounterComponent } from './containers/counter/counter.component';

import { LinkService } from './shared/link.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        // App Routing
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home', component: HomeComponent,
                data: {
                    title: 'Homepage',
                    meta: [{ name: 'description', content: 'This is an example Description Meta tag!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/blah/nice' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/' }
                    ]
                }
            },
            {
                path: 'counter', component: CounterComponent,
                data: {
                    title: 'Counter',
                    meta: [{ name: 'description', content: 'This is an Counter page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/counter/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/counter' }
                    ]
                }
            },
            { 
                path: 'fetch-data', component: FetchDataComponent,
                data: {
                    title: 'REST demo',
                    meta: [{ name: 'description', content: `We're hitting REST in this Demo!` }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/fetch-data/canonicaldemo' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/fetchstuff' }
                    ]
                }
            },
            // All else fails - go home!
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        LinkService
    ]
})
export class AppModule {
}
