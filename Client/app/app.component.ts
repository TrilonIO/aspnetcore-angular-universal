import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Meta, Title, DOCUMENT, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformServer } from '@angular/common';
import { LinkService } from './shared/link.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
    private endPageTitle: string = 'Angular Universal & ASP.NET Core Starter';
    // If no Title is provided, we'll use a default one before the dash(-)
    private defaultPageTitle: string = 'My App';

    private sub: Subscription;
    private isServer: boolean = isPlatformServer(this.platform_id);

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private linkService: LinkService,
        @Inject(PLATFORM_ID) private platform_id
    ) { }

    ngOnInit() {
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this._changeTitleOnNavigation();
    }

    ngOnDestroy() {
        // Subscription clean-up
        this.sub.unsubscribe();
    }

    private _changeTitleOnNavigation() {

        // this.sub = this.router.events
        //     .filter(event => event instanceof NavigationEnd)
        //     .map(() => this.activatedRoute)
        //     .map(route => {
        //         while (route.firstChild) route = route.firstChild;
        //         return route;
        //     })
        //     .filter(route => route.outlet === 'primary')
        //     .mergeMap(route => route.data)
        //     .subscribe((event) => {
        //         this._setMetaAndLinks(event);
        //     });
    }

    private _setMetaAndLinks(event) {

        // Set Title if available, otherwise leave the default Title
        const title = event['title']
            ? `${event['title']} - ${this.endPageTitle}`
            : `${this.defaultPageTitle} - ${this.endPageTitle}`;

        this.title.setTitle(title);

        const metaData = event['meta'] || [];
        const linksData = event['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }

        for (let i = 0; i < linksData.length; i++) {
            this.linkService.addTag(linksData[i]);
        }
    }

}

