import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

// Main "APP" Root Component
import { AppComponent } from './app.component';

// Component imports
import { NavMenuComponent } from '../components';

// Container (aka: "pages") imports
import { 
    HomeComponent,
    FetchDataComponent,
    CounterComponent
} from '../containers';

// Provider (aka: "services") imports
import { SocketConnectionService } from '../shared/websockets';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, 
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    providers: [
        SocketConnectionService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
