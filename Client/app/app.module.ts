import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UniversalModule, isBrowser, isNode } from 'angular2-universal';

// Bootstrap (non-jQuery implementation
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Main "APP" Root Component
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

// Component imports
import { NavMenuComponent } from '../components';

// Container (aka: "pages") imports
import { 
    HomeComponent,
    WebSocketTestComponent,
    RestTestComponent,
    BootstrapComponent
} from '../containers';

// Provider (aka: "shared" | "services") imports
import { SocketConnectionService, WebSocketService } from '../shared';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, 
        NavMenuComponent,
        RestTestComponent,
        WebSocketTestComponent,
        HomeComponent,
        BootstrapComponent
    ],
    providers: [

    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.

        // Here we can import other stuff
        // Even make it dynamic whether it's for Browser or Server (Dependency Injection)
        // isBrowser ? something : somethingElse, <- basic pseudo example

        FormsModule,
        Ng2BootstrapModule,

        RouterModule.forRoot(ROUTES)
    ]
})
export class AppModule {
}
