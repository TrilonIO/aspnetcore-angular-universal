import { Component, ViewEncapsulation, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isBrowser } from 'angular2-universal';
import { Meta, metaStore } from 'app-shared';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-root',
    template: `
        <div class="container-fluid">
            <app-nav-menu></app-nav-menu>
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

    private defaultPageTitle: string = 'Angular Universal & ASP.NET Core Starter';
    private sub: Subscription;
  
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public meta: Meta
    ) {}
    
    ngOnInit() {
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this.changeTitleOnNavigation();
        console.log('oninit'); 
    }
    
    ngOnDestroy() {
        // Subscription clean-up
        this.sub.unsubscribe();
    }

    private changeTitleOnNavigation () {
        this.sub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {

                // Set Title if available, otherwise leave the default Title
                const title = event['title'] 
                    ? (event['title'] + ' - ' + this.defaultPageTitle)
                    : this.defaultPageTitle;

                metaStore.title = title;
                metaStore.meta = {
                    
                };

                // Temporarily only do this in the Browser
                // Until we can get entire Html doc (this is a .NET issue since we never pass the entire Document (only root-app))
                return isBrowser ? this.meta.setTitle(title) : '';
            });
    }

}
