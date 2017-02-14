exports.ids = [0];
exports.modules = {

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Lazy-Loaded Module & Component
 *  You can see that it wasn't referenced anywhere in the app / modules
 *  Except for in the app.routes.ts file
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(5);
var router_1 = __webpack_require__(23);
var app_1 = __webpack_require__(17);
var faq_component_1 = __webpack_require__(396);
var FAQModule = (function () {
    function FAQModule() {
    }
    FAQModule = __decorate([
        core_1.NgModule({
            imports: [
                app_1.BaseSharedModule,
                router_1.RouterModule.forChild([
                    { path: '', component: faq_component_1.FAQComponent }
                ])
            ],
            declarations: [
                faq_component_1.FAQComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FAQModule);
    return FAQModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FAQModule;


/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(5);
var FAQComponent = (function () {
    // Use "constructor"s only for dependency injection
    function FAQComponent() {
    }
    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    FAQComponent.prototype.ngOnInit = function () {
        console.log('\n\nFAQ Component lazy-loaded!!\n\n');
    };
    FAQComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.Default,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            selector: 'app-faq',
            template: __webpack_require__(397)
        }), 
        __metadata('design:paramtypes', [])
    ], FAQComponent);
    return FAQComponent;
}());
exports.FAQComponent = FAQComponent;


/***/ }),

/***/ 397:
/***/ (function(module, exports) {

module.exports = "<h1>FAQ</h1>\r\n\r\n<blockquote>\r\n    <strong>Fun fact:</strong> This Component was <em>lazy loaded</em> :)<br>\r\n    Check your Network tab to see that the JS file came only when you first hit this Route.\r\n</blockquote>\r\n\r\n<h2>How to add a route in the app:</h2>\r\n\r\n<ul>\r\n    <li>Create a folder & your Component in Client\\Containers\\</li>\r\n    <li>Add the Component to: Client\\Containers\\index.ts (this is the \"barrels\" file for all containers)</li>\r\n    <li>Add the Component to MODULES & ROUTES within: \\Client\\app\\platform-modules\\app.module.ts</li>\r\n</ul>\r\n\r\n<h2>How can I disable Universal / SSR (Server-side rendering)?</h2>\r\n\r\nTo disable SSR, go to Views/Home/Index.cshtml and remove asp-prerender-module=\"Client/bootstrap-server\" from the <code>\"app-root\"</code> \r\ncomponent there in the cshtml file.\r\n\r\n<h2>How do I prevent XHR calls from running again on the Client?</h2>\r\n\r\nUsing the provided GET from HttpCacheService as opposed to regular Http, it will automatically Cache the \r\nresponse on the server, and pass it down through the html for you, and when the Client tries to run it again, \r\nit will instantly grab the result from there.\r\n\r\n<strong>This is essential for important XHR calls on a page that happen on page load</strong>\r\n\r\n<h2>How do I have code run only in the Browser?</h2>\r\n\r\nAngular Universal has isBrowser & isNode you can import from angular2-universal to conditionally run code. \r\nThis is perfect for situations where code could error on the server. <strong>Also, always remember that things like \r\nsetTimeout / setInterval / etc should always be wrapped in this</strong>, as you want to completely avoid doing them on the Server.\r\n\r\n<pre>\r\n{{ \" \r\nimport { isBrowser } from 'angular2-universal';\r\n\r\nif (isBrowser) {\r\n   // do something only in the Browser\r\n}\r\n\"}}\r\n</pre>\r\n\r\n<h2>How can I use Material2 with this Repo?</h2>\r\n\r\nFor now, Material2 is still in beta, and isn't fully functioning with Universal (it will sometime soon though!), \r\nso temporarily disable SSR (server-side rendering) so you can use it within your application until updates come \r\nfrom Material, and you can have it rendered on the server as well. Read the Material docs to see how to add Material \r\nto your Angular application, with SSR disabled everything should work without any problems.\r\n\r\n<h2>How can I use jQuery and/or some jQuery plugins with Angular Universal?</h2>\r\n\r\n<blockquote>Note: If at all possible, try to avoid using jQuery or libraries dependent on it, as there are better, \r\n    more abstract ways of dealing with the DOM in Angular (2+) such as using the Renderer, etc.</blockquote>\r\n\r\nYes, of course but there are a few things you need to setup before doing this. First, make sure jQuery is included in \r\nwebpack vendor file, and that you have a webpack Plugin setup for it. <code>{{ \"new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })\" }}</code>\r\n\r\nNow, make sure any \"plugins\" etc that you have, are only included in your bootstrap-client.ts file. \r\n(ie: import 'slick-carousel';) In a Component you want to use jQuery, make sure to import it near the top like so:\r\n\r\n<code>\r\nimport * as $ from 'jquery';\r\n</code>\r\n\r\n<strong>Always make sure to wrap anything jQuery oriented in Universal's isBrowser conditional!</strong>\r\n\r\n<br><br>"

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnQvY29udGFpbmVycy8rZmFxL2ZhcS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50L2NvbnRhaW5lcnMvK2ZhcS9mYXEuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL0NsaWVudC9jb250YWluZXJzLytmYXEvZmFxLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztHQUlHOzs7Ozs7Ozs7OztBQUVILGlDQUF5QixDQUFlLENBQUM7QUFDekMsbUNBQTZCLEVBQWlCLENBQUM7QUFFL0MsZ0NBQWlDLEVBQUssQ0FBQztBQUN2QywwQ0FBNkIsR0FBaUIsQ0FBQztBQWEvQztJQUFBO0lBQWlDLENBQUM7SUFYbEM7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asc0JBQWdCO2dCQUNoQixxQkFBWSxDQUFDLFFBQVEsQ0FBQztvQkFDcEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw0QkFBWSxFQUFFO2lCQUN0QyxDQUFDO2FBQ0g7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osNEJBQVk7YUFDYjtTQUNGLENBQUM7O2lCQUFBO0lBQytCLGdCQUFDO0FBQUQsQ0FBQztBQUFsQzsyQkFBa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QmxDLGlDQUFzRixDQUFlLENBQUM7QUFRdEc7SUFFRSxtREFBbUQ7SUFDbkQ7SUFBZ0IsQ0FBQztJQUVqQiwrREFBK0Q7SUFDL0QsNEVBQTRFO0lBQzVFLCtCQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQWZIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxPQUFPO1lBQ2hELGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxRQUFRO1lBQ3pDLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxtQkFBTyxDQUFDLEdBQXNCLENBQUM7U0FDMUMsQ0FBQzs7b0JBQUE7SUFZRixtQkFBQztBQUFELENBQUM7QUFYWSxvQkFBWSxlQVd4Qjs7Ozs7Ozs7QUNuQkQsZ3ZEQUFndkQsZ0JBQWdCLFlBQVksMkJBQTJCLHdCQUF3QiwrQ0FBK0MsUUFBUSwwaENBQTBoQyw4QkFBOEIsZ0NBQWdDLE1BQU0sc0pBQXNKLG1JQUFtSSw0SSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogTGF6eS1Mb2FkZWQgTW9kdWxlICYgQ29tcG9uZW50XHJcbiAqICBZb3UgY2FuIHNlZSB0aGF0IGl0IHdhc24ndCByZWZlcmVuY2VkIGFueXdoZXJlIGluIHRoZSBhcHAgLyBtb2R1bGVzXHJcbiAqICBFeGNlcHQgZm9yIGluIHRoZSBhcHAucm91dGVzLnRzIGZpbGVcclxuICovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQmFzZVNoYXJlZE1vZHVsZSB9IGZyb20gJ2FwcCc7XHJcbmltcG9ydCB7IEZBUUNvbXBvbmVudCB9IGZyb20gJy4vZmFxLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJhc2VTaGFyZWRNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xyXG4gICAgICB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IEZBUUNvbXBvbmVudCB9XHJcbiAgICBdKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGQVFDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZBUU1vZHVsZSB7IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9DbGllbnQvY29udGFpbmVycy8rZmFxL2ZhcS5tb2R1bGUudHMiLCJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCxcclxuICBzZWxlY3RvcjogJ2FwcC1mYXEnLFxyXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2ZhcS5jb21wb25lbnQuaHRtbCcpXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGQVFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvLyBVc2UgXCJjb25zdHJ1Y3RvclwicyBvbmx5IGZvciBkZXBlbmRlbmN5IGluamVjdGlvblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8vIEhlcmUgeW91IHdhbnQgdG8gaGFuZGxlIGFueXRoaW5nIHdpdGggQElucHV0KCkncyBAT3V0cHV0KCknc1xyXG4gIC8vIERhdGEgcmV0cmlldmFsIC8gZXRjIC0gdGhpcyBpcyB3aGVuIHRoZSBDb21wb25lbnQgaXMgXCJyZWFkeVwiIGFuZCB3aXJlZCB1cFxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ1xcblxcbkZBUSBDb21wb25lbnQgbGF6eS1sb2FkZWQhIVxcblxcbicpO1xyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9DbGllbnQvY29udGFpbmVycy8rZmFxL2ZhcS5jb21wb25lbnQudHMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgxPkZBUTwvaDE+XFxyXFxuXFxyXFxuPGJsb2NrcXVvdGU+XFxyXFxuICAgIDxzdHJvbmc+RnVuIGZhY3Q6PC9zdHJvbmc+IFRoaXMgQ29tcG9uZW50IHdhcyA8ZW0+bGF6eSBsb2FkZWQ8L2VtPiA6KTxicj5cXHJcXG4gICAgQ2hlY2sgeW91ciBOZXR3b3JrIHRhYiB0byBzZWUgdGhhdCB0aGUgSlMgZmlsZSBjYW1lIG9ubHkgd2hlbiB5b3UgZmlyc3QgaGl0IHRoaXMgUm91dGUuXFxyXFxuPC9ibG9ja3F1b3RlPlxcclxcblxcclxcbjxoMj5Ib3cgdG8gYWRkIGEgcm91dGUgaW4gdGhlIGFwcDo8L2gyPlxcclxcblxcclxcbjx1bD5cXHJcXG4gICAgPGxpPkNyZWF0ZSBhIGZvbGRlciAmIHlvdXIgQ29tcG9uZW50IGluIENsaWVudFxcXFxDb250YWluZXJzXFxcXDwvbGk+XFxyXFxuICAgIDxsaT5BZGQgdGhlIENvbXBvbmVudCB0bzogQ2xpZW50XFxcXENvbnRhaW5lcnNcXFxcaW5kZXgudHMgKHRoaXMgaXMgdGhlIFxcXCJiYXJyZWxzXFxcIiBmaWxlIGZvciBhbGwgY29udGFpbmVycyk8L2xpPlxcclxcbiAgICA8bGk+QWRkIHRoZSBDb21wb25lbnQgdG8gTU9EVUxFUyAmIFJPVVRFUyB3aXRoaW46IFxcXFxDbGllbnRcXFxcYXBwXFxcXHBsYXRmb3JtLW1vZHVsZXNcXFxcYXBwLm1vZHVsZS50czwvbGk+XFxyXFxuPC91bD5cXHJcXG5cXHJcXG48aDI+SG93IGNhbiBJIGRpc2FibGUgVW5pdmVyc2FsIC8gU1NSIChTZXJ2ZXItc2lkZSByZW5kZXJpbmcpPzwvaDI+XFxyXFxuXFxyXFxuVG8gZGlzYWJsZSBTU1IsIGdvIHRvIFZpZXdzL0hvbWUvSW5kZXguY3NodG1sIGFuZCByZW1vdmUgYXNwLXByZXJlbmRlci1tb2R1bGU9XFxcIkNsaWVudC9ib290c3RyYXAtc2VydmVyXFxcIiBmcm9tIHRoZSA8Y29kZT5cXFwiYXBwLXJvb3RcXFwiPC9jb2RlPiBcXHJcXG5jb21wb25lbnQgdGhlcmUgaW4gdGhlIGNzaHRtbCBmaWxlLlxcclxcblxcclxcbjxoMj5Ib3cgZG8gSSBwcmV2ZW50IFhIUiBjYWxscyBmcm9tIHJ1bm5pbmcgYWdhaW4gb24gdGhlIENsaWVudD88L2gyPlxcclxcblxcclxcblVzaW5nIHRoZSBwcm92aWRlZCBHRVQgZnJvbSBIdHRwQ2FjaGVTZXJ2aWNlIGFzIG9wcG9zZWQgdG8gcmVndWxhciBIdHRwLCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgQ2FjaGUgdGhlIFxcclxcbnJlc3BvbnNlIG9uIHRoZSBzZXJ2ZXIsIGFuZCBwYXNzIGl0IGRvd24gdGhyb3VnaCB0aGUgaHRtbCBmb3IgeW91LCBhbmQgd2hlbiB0aGUgQ2xpZW50IHRyaWVzIHRvIHJ1biBpdCBhZ2FpbiwgXFxyXFxuaXQgd2lsbCBpbnN0YW50bHkgZ3JhYiB0aGUgcmVzdWx0IGZyb20gdGhlcmUuXFxyXFxuXFxyXFxuPHN0cm9uZz5UaGlzIGlzIGVzc2VudGlhbCBmb3IgaW1wb3J0YW50IFhIUiBjYWxscyBvbiBhIHBhZ2UgdGhhdCBoYXBwZW4gb24gcGFnZSBsb2FkPC9zdHJvbmc+XFxyXFxuXFxyXFxuPGgyPkhvdyBkbyBJIGhhdmUgY29kZSBydW4gb25seSBpbiB0aGUgQnJvd3Nlcj88L2gyPlxcclxcblxcclxcbkFuZ3VsYXIgVW5pdmVyc2FsIGhhcyBpc0Jyb3dzZXIgJiBpc05vZGUgeW91IGNhbiBpbXBvcnQgZnJvbSBhbmd1bGFyMi11bml2ZXJzYWwgdG8gY29uZGl0aW9uYWxseSBydW4gY29kZS4gXFxyXFxuVGhpcyBpcyBwZXJmZWN0IGZvciBzaXR1YXRpb25zIHdoZXJlIGNvZGUgY291bGQgZXJyb3Igb24gdGhlIHNlcnZlci4gPHN0cm9uZz5BbHNvLCBhbHdheXMgcmVtZW1iZXIgdGhhdCB0aGluZ3MgbGlrZSBcXHJcXG5zZXRUaW1lb3V0IC8gc2V0SW50ZXJ2YWwgLyBldGMgc2hvdWxkIGFsd2F5cyBiZSB3cmFwcGVkIGluIHRoaXM8L3N0cm9uZz4sIGFzIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgYXZvaWQgZG9pbmcgdGhlbSBvbiB0aGUgU2VydmVyLlxcclxcblxcclxcbjxwcmU+XFxyXFxue3sgXFxcIiBcXHJcXG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICdhbmd1bGFyMi11bml2ZXJzYWwnO1xcclxcblxcclxcbmlmIChpc0Jyb3dzZXIpIHtcXHJcXG4gICAvLyBkbyBzb21ldGhpbmcgb25seSBpbiB0aGUgQnJvd3Nlclxcclxcbn1cXHJcXG5cXFwifX1cXHJcXG48L3ByZT5cXHJcXG5cXHJcXG48aDI+SG93IGNhbiBJIHVzZSBNYXRlcmlhbDIgd2l0aCB0aGlzIFJlcG8/PC9oMj5cXHJcXG5cXHJcXG5Gb3Igbm93LCBNYXRlcmlhbDIgaXMgc3RpbGwgaW4gYmV0YSwgYW5kIGlzbid0IGZ1bGx5IGZ1bmN0aW9uaW5nIHdpdGggVW5pdmVyc2FsIChpdCB3aWxsIHNvbWV0aW1lIHNvb24gdGhvdWdoISksIFxcclxcbnNvIHRlbXBvcmFyaWx5IGRpc2FibGUgU1NSIChzZXJ2ZXItc2lkZSByZW5kZXJpbmcpIHNvIHlvdSBjYW4gdXNlIGl0IHdpdGhpbiB5b3VyIGFwcGxpY2F0aW9uIHVudGlsIHVwZGF0ZXMgY29tZSBcXHJcXG5mcm9tIE1hdGVyaWFsLCBhbmQgeW91IGNhbiBoYXZlIGl0IHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXIgYXMgd2VsbC4gUmVhZCB0aGUgTWF0ZXJpYWwgZG9jcyB0byBzZWUgaG93IHRvIGFkZCBNYXRlcmlhbCBcXHJcXG50byB5b3VyIEFuZ3VsYXIgYXBwbGljYXRpb24sIHdpdGggU1NSIGRpc2FibGVkIGV2ZXJ5dGhpbmcgc2hvdWxkIHdvcmsgd2l0aG91dCBhbnkgcHJvYmxlbXMuXFxyXFxuXFxyXFxuPGgyPkhvdyBjYW4gSSB1c2UgalF1ZXJ5IGFuZC9vciBzb21lIGpRdWVyeSBwbHVnaW5zIHdpdGggQW5ndWxhciBVbml2ZXJzYWw/PC9oMj5cXHJcXG5cXHJcXG48YmxvY2txdW90ZT5Ob3RlOiBJZiBhdCBhbGwgcG9zc2libGUsIHRyeSB0byBhdm9pZCB1c2luZyBqUXVlcnkgb3IgbGlicmFyaWVzIGRlcGVuZGVudCBvbiBpdCwgYXMgdGhlcmUgYXJlIGJldHRlciwgXFxyXFxuICAgIG1vcmUgYWJzdHJhY3Qgd2F5cyBvZiBkZWFsaW5nIHdpdGggdGhlIERPTSBpbiBBbmd1bGFyICgyKykgc3VjaCBhcyB1c2luZyB0aGUgUmVuZGVyZXIsIGV0Yy48L2Jsb2NrcXVvdGU+XFxyXFxuXFxyXFxuWWVzLCBvZiBjb3Vyc2UgYnV0IHRoZXJlIGFyZSBhIGZldyB0aGluZ3MgeW91IG5lZWQgdG8gc2V0dXAgYmVmb3JlIGRvaW5nIHRoaXMuIEZpcnN0LCBtYWtlIHN1cmUgalF1ZXJ5IGlzIGluY2x1ZGVkIGluIFxcclxcbndlYnBhY2sgdmVuZG9yIGZpbGUsIGFuZCB0aGF0IHlvdSBoYXZlIGEgd2VicGFjayBQbHVnaW4gc2V0dXAgZm9yIGl0LiA8Y29kZT57eyBcXFwibmV3IHdlYnBhY2suUHJvdmlkZVBsdWdpbih7ICQ6ICdqcXVlcnknLCBqUXVlcnk6ICdqcXVlcnknIH0pXFxcIiB9fTwvY29kZT5cXHJcXG5cXHJcXG5Ob3csIG1ha2Ugc3VyZSBhbnkgXFxcInBsdWdpbnNcXFwiIGV0YyB0aGF0IHlvdSBoYXZlLCBhcmUgb25seSBpbmNsdWRlZCBpbiB5b3VyIGJvb3RzdHJhcC1jbGllbnQudHMgZmlsZS4gXFxyXFxuKGllOiBpbXBvcnQgJ3NsaWNrLWNhcm91c2VsJzspIEluIGEgQ29tcG9uZW50IHlvdSB3YW50IHRvIHVzZSBqUXVlcnksIG1ha2Ugc3VyZSB0byBpbXBvcnQgaXQgbmVhciB0aGUgdG9wIGxpa2Ugc286XFxyXFxuXFxyXFxuPGNvZGU+XFxyXFxuaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnknO1xcclxcbjwvY29kZT5cXHJcXG5cXHJcXG48c3Ryb25nPkFsd2F5cyBtYWtlIHN1cmUgdG8gd3JhcCBhbnl0aGluZyBqUXVlcnkgb3JpZW50ZWQgaW4gVW5pdmVyc2FsJ3MgaXNCcm93c2VyIGNvbmRpdGlvbmFsITwvc3Ryb25nPlxcclxcblxcclxcbjxicj48YnI+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudC9jb250YWluZXJzLytmYXEvZmFxLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==