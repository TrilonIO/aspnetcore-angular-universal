import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    title = 'Angular 4.0 Universal & ASP.NET Core advanced starter-kit';
    private AIService: AppInsightsService;
    private isBrowser: boolean;

    // Use "constructor"s only for dependency injection
    constructor(
      public translate: TranslateService,
      @Inject(PLATFORM_ID) private platformId,
      private injector: Injector
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
      if (this.isBrowser) {
        this.AIService = <AppInsightsService>this.injector.get(AppInsightsService);
        this.AIService.trackEvent('Testing', { 'user': 'me' });
      }
    }

    public setLanguage(lang) {
        this.translate.use(lang);
    }
}
