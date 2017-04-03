import { 
    Component, OnInit, 
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';

import { Http } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
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
export class FetchDataComponent implements OnInit {
    
    public users: IUser[];

    // Use "constructor"s only for dependency injection
    constructor(
        private http: Http,
        @Inject(APP_BASE_HREF) private baseHref: string
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.http.get(`${this.baseHref}/api/test/users`).map(res => res.json()).subscribe(result => {
            console.log(result);
            this.users = result as IUser[];
        });
    }
}

interface IUser {
    id: number;
    name: string;
}
