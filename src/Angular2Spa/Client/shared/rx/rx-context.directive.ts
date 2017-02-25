import { 
    Directive, Input, OnInit,
    EmbeddedViewRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

/* tslint:disable */ // <-- disabled to ignore app- prefix 
@Directive({
    selector: '[rxContext][apprxContextOn]'
})
/* tslint:enable */
export class RxContextDirective implements OnInit {

    @Input() rxContextOn: Observable<any>;
    viewRef: EmbeddedViewRef<any>;

    constructor (private templateRef: TemplateRef<any>, private vcr: ViewContainerRef, private cdr: ChangeDetectorRef) {
        this.cdr.detach();
    }

    ngOnInit() {
        this.rxContextOn.subscribe(state => {
            if (!this.viewRef) {
                this.viewRef = this.vcr.createEmbeddedView(this.templateRef, { '$implicit' : state });
            }
            this.viewRef.context.$implicit = state;
        });
    }

}
