import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './containers/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { FetchDataComponent } from './containers/fetchdata/fetchdata.component';
import { CounterComponent } from './containers/counter/counter.component';
import { ChatComponent } from './containers/chat/chat.component';

import { LinkService } from './shared/link.service';
import { ConnectionResolver } from './shared/route.resolver';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ChatComponent
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

                // *** SEO Magic ***
                // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
                // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
                // When you change Routes it will automatically append these to your document for you on the Server-side
                //  - check out app.component.ts to see how it's doing this 
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
            {
                path: 'chat', component: ChatComponent, resolve: { connection: ConnectionResolver },
                data: {
                    title: 'SignalR chat example',
                    meta: [{ name: 'description', content: 'This is an Chat page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/chat/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/chat' }
                    ]
                }
            },
            // All else fails - go home!
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        LinkService, ConnectionResolver
    ]
})
export class AppModule {
}
