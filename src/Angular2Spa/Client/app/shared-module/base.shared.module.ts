/*
 * --Base-- SHARED Module
 * 
 * This has the most "basic" Shared imports that can be imported into 
 * all children (lazy-loaded for example) NgModules.
 * (ie: Admin NgModule can import this, to import all the basic App functionality, FormsModule, CommonModule etc)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule
    ]
})
export class BaseSharedModule {
    
}


