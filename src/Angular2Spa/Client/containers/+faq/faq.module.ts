/*
 * Lazy-Loaded Module & Component
 *  You can see that it wasn't referenced anywhere in the app / modules
 *  Except for in the app.routes.ts file
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app';
import { FAQComponent } from './faq.component';

@NgModule({
  imports: [
    BaseSharedModule,
    RouterModule.forChild([
      { path: '', component: FAQComponent }
    ])
  ],
  declarations: [
    FAQComponent
  ]
})
export default class FAQModule { }
