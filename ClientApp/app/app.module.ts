import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UniversalModule, isBrowser, isNode } from 'angular2-universal';

// Main "APP" Root Component
import { AppComponent } from './app.component';

// Component imports
import { NavMenuComponent } from '../components';

// Container (aka: "pages") imports
import { 
    HomeComponent,
    WebSocketTestComponent,
    RestTestComponent
} from '../containers';

// Provider (aka: "services") imports
import { SocketConnectionService, WebSocketService } from '../shared/websockets';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, 
        NavMenuComponent,
        RestTestComponent,
        WebSocketTestComponent,
        HomeComponent
    ],
    providers: [
        // SocketConnectionService,
        // WebSocketService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.

        // Here we can import other stuff
        // Even make it dynamic whether it's for Browser or Server (Dependency Injection)
        // isBrowser ? something : somethingElse, <- basic pseudo example

        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'rest-test', component: RestTestComponent },
            { path: 'websocket-test', component: WebSocketTestComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
