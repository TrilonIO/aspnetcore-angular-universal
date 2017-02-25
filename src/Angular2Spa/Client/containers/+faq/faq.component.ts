import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit {

  // Use "constructor"s only for dependency injection
  constructor() { }

  // Here you want to handle anything with @Input()'s @Output()'s
  // Data retrieval / etc - this is when the Component is "ready" and wired up
  ngOnInit() {
    console.log('\n\nFAQ Component lazy-loaded!!\n\n');
  }

}
