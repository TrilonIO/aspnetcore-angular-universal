/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('Home Component', () => {

    let comp:    HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({ 
            declarations: [HomeComponent] 
        });

        fixture = TestBed.createComponent(HomeComponent);

        // HomeComponent test instance
        comp = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        
        const titleText = de.nativeElement.textContent;
        expect(titleText).toContain(comp.title);
    }));

});
