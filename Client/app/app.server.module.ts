import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// for AoT we need to manually split universal packages (/browser & /node)
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node';

// Bootstrap (non-jQuery implementation)
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Main "APP" Root Component
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

// Component imports
import { NavMenuComponent } from 'app-components';

// Container (aka: "pages") imports
import {
    HomeComponent,
    RestTestComponent,
    BootstrapComponent
} from 'app-containers';

// Provider (aka: "shared" | "services") imports
import {
    HttpCacheService, CacheService // Universal : XHR Cache
} from 'app-shared';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, 
        NavMenuComponent,
        RestTestComponent,
        HomeComponent,
        BootstrapComponent
    ],
    providers: [
        { provide: 'isBrowser', useValue: isBrowser },
        { provide: 'isNode', useValue: isNode },
        CacheService,
        HttpCacheService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports NodeModule, NodeHttpModule, and NodeJsonpModule too.

        // Here we can import other stuff
        // Even make it dynamic whether it's for Browser or Server (Dependency Injection)
        // isBrowser ? something : somethingElse, <- basic pseudo example

        FormsModule,
        Ng2BootstrapModule,

        RouterModule.forRoot(ROUTES)
    ]
})
export class AppModule {
    constructor(public cache: CacheService) {

    }

    /**
     * We need to use the arrow function here to bind the context as this is a gotcha
     * in Universal for now until it's fixed
     */
    universalDoDehydrate = (universalCache) => {
        console.log('universalDoDehydrate ****');
        universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
    }

    /**
     * Clear the cache after it's rendered
     */
    universalAfterDehydrate = () => {
        this.cache.clear();
    }
}
