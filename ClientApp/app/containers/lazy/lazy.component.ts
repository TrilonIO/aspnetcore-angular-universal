import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-view',
  template: `
    <h1>Lazy-Loaded Component!</h1>
    <blockquote>
      Fun fact: This was lazy-loaded :)
      Check your Network tab!
    </blockquote>
  `
})
export class LazyComponent {}
