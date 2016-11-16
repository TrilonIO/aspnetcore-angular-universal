import { Component } from '@angular/core';

@Component({
    selector: 'app-bootstrap',
    template: require('./bootstrap.component.html')
})
export class BootstrapComponent {

    public oneAtATime: boolean = true;
    public items: Array<string> = ['Item 1', 'Item 2', 'Item 3'];

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    public groups: Array<any> = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    // Use "constructor"s only for dependency injection
    constructor () {}

    addItem(): void {
        this.items.push(`Items ${this.items.length + 1}`);
    }

}
