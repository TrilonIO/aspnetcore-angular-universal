import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

// i18n support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { UsersComponent } from './containers/users/users.component';
import { CounterComponent } from './containers/counter/counter.component';
import { ChatComponent } from './containers/chat/chat.component';
import { Ng2BootstrapComponent } from './containers/ng2-bootstrap-demo/ng2bootstrap.component';

import { LinkService } from './shared/link.service';
import { ConnectionResolver } from './shared/route.resolver';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';

export function createTranslateLoader(http: Http, baseHref) {
    console.log('\n\n\n New method? ' + baseHref);
    // Temporary Azure hack
    if (baseHref === null && typeof window !== 'undefined') {
        baseHref = window.location.origin;
    }
    // i18n files are in `wwwroot/assets/`
    return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        UsersComponent,
        HomeComponent,
        ChatComponent,
        Ng2BootstrapComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        Ng2BootstrapModule.forRoot(), // You could also split this up if you don't want the Entire Module imported

        // i18n support
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http, [ORIGIN_URL]]
            }
        }),

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
            {
                path: 'ng2-bootstrap', component: Ng2BootstrapComponent,
                data: {
                    title: 'Ng2-bootstrap demo!!',
                    meta: [{ name: 'description', content: 'This is an Demo Bootstrap page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
                    ]
                }
            },

            // All else fails - go home!
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        LinkService,
        ConnectionResolver,
        TranslateModule
    ]
})
export class AppModule {
}
