webpackJsonp([0],{

/***/ 672:
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
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(45);
var app_1 = __webpack_require__(21);
var faq_component_1 = __webpack_require__(673);
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

/***/ 673:
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
var core_1 = __webpack_require__(1);
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
            template: __webpack_require__(674)
        }), 
        __metadata('design:paramtypes', [])
    ], FAQComponent);
    return FAQComponent;
}());
exports.FAQComponent = FAQComponent;


/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = "<h1>FAQ</h1>\r\n\r\n<blockquote>\r\n    <strong>Fun fact:</strong> This Component was <em>lazy loaded</em> :)<br>\r\n    Check your Network tab to see that the JS file came only when you first hit this Route.\r\n</blockquote>\r\n\r\n<h2>How to add a route in the app:</h2>\r\n\r\n<ul>\r\n    <li>Create a folder & your Component in Client\\Containers\\</li>\r\n    <li>Add the Component to: Client\\Containers\\index.ts (this is the \"barrels\" file for all containers)</li>\r\n    <li>Add the Component to MODULES & ROUTES within: \\Client\\app\\platform-modules\\app.module.ts</li>\r\n</ul>\r\n\r\n<h2>How can I disable Universal / SSR (Server-side rendering)?</h2>\r\n\r\nTo disable SSR, go to Views/Home/Index.cshtml and remove asp-prerender-module=\"Client/bootstrap-server\" from the <code>\"app-root\"</code> \r\ncomponent there in the cshtml file.\r\n\r\n<h2>How do I prevent XHR calls from running again on the Client?</h2>\r\n\r\nUsing the provided GET from HttpCacheService as opposed to regular Http, it will automatically Cache the \r\nresponse on the server, and pass it down through the html for you, and when the Client tries to run it again, \r\nit will instantly grab the result from there.\r\n\r\n<strong>This is essential for important XHR calls on a page that happen on page load</strong>\r\n\r\n<h2>How do I have code run only in the Browser?</h2>\r\n\r\nAngular Universal has isBrowser & isNode you can import from angular2-universal to conditionally run code. \r\nThis is perfect for situations where code could error on the server. <strong>Also, always remember that things like \r\nsetTimeout / setInterval / etc should always be wrapped in this</strong>, as you want to completely avoid doing them on the Server.\r\n\r\n<pre>\r\n{{ \" \r\nimport { isBrowser } from 'angular2-universal';\r\n\r\nif (isBrowser) {\r\n   // do something only in the Browser\r\n}\r\n\"}}\r\n</pre>\r\n\r\n<h2>How can I use Material2 with this Repo?</h2>\r\n\r\nFor now, Material2 is still in beta, and isn't fully functioning with Universal (it will sometime soon though!), \r\nso temporarily disable SSR (server-side rendering) so you can use it within your application until updates come \r\nfrom Material, and you can have it rendered on the server as well. Read the Material docs to see how to add Material \r\nto your Angular application, with SSR disabled everything should work without any problems.\r\n\r\n<h2>How can I use jQuery and/or some jQuery plugins with Angular Universal?</h2>\r\n\r\n<blockquote>Note: If at all possible, try to avoid using jQuery or libraries dependent on it, as there are better, \r\n    more abstract ways of dealing with the DOM in Angular (2+) such as using the Renderer, etc.</blockquote>\r\n\r\nYes, of course but there are a few things you need to setup before doing this. First, make sure jQuery is included in \r\nwebpack vendor file, and that you have a webpack Plugin setup for it. <code>{{ \"new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })\" }}</code>\r\n\r\nNow, make sure any \"plugins\" etc that you have, are only included in your bootstrap-client.ts file. \r\n(ie: import 'slick-carousel';) In a Component you want to use jQuery, make sure to import it near the top like so:\r\n\r\n<code>\r\nimport * as $ from 'jquery';\r\n</code>\r\n\r\n<strong>Always make sure to wrap anything jQuery oriented in Universal's isBrowser conditional!</strong>\r\n\r\n<br><br>"

/***/ })

});
//# sourceMappingURL=0.js.map