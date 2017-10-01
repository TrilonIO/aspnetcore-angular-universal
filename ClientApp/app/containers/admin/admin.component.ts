import { Component, OnInit, Inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {


    // Use "constructor"s only for dependency injection
    constructor(
      public translate: TranslateService
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() { }

    public setLanguage(lang) {
        this.translate.use(lang);
    }
}
