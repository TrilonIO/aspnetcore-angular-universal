import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './containers/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { UsersComponent } from './containers/users/users.component';
import { CounterComponent } from './containers/counter/counter.component';
import { ChatComponent } from './containers/chat/chat.component';

import { LinkService } from './shared/link.service';
import { ConnectionResolver } from './shared/route.resolver';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        UsersComponent,
        HomeComponent,
        ChatComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
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
                path: 'users', component: UsersComponent,
                data: {
                    title: 'Users REST example',
                    meta: [{ name: 'description', content: 'This is User REST API example page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/chat/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/users' }
                    ]
                }
            },
            {
                path: 'chat', component: ChatComponent, 
                // Wait until the resolve is finished before loading the Route
                resolve: { connection: ConnectionResolver },
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
        LinkService, 
        ConnectionResolver
    ]
})
export class AppModule {
}
