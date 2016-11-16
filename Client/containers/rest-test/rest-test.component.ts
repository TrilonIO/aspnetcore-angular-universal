import { 
    Component, OnInit, 
    // animation imports
    trigger, state, style, transition, animate } from '@angular/core';

import { Http } from '@angular/http';
import { HttpCacheService } from 'app-shared';

@Component({
    selector: 'app-rest-test',
    template: require('./rest-test.component.html'),
    animations: [
        // Animation example
        // Triggered in the ngFor with [@flyInOut]
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)'})),
            transition('void => *', [
                style({transform: 'translateY(-100%)'}),
                animate(1000)
            ]),
            transition('* => void', [
                animate(1000, style({transform: 'translateY(100%)'}))
            ])
        ])
    ]
})
export class RestTestComponent implements OnInit {
    
    public users: IUser[];

    // Use "constructor"s only for dependency injection
    constructor(private httpCache: HttpCacheService) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.httpCache.get('/api/test/users').subscribe(result => {
            this.users = result;
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
