# ASP.NET Core & Angular2 Universal starter

<p align="center">
    <img src="./docs/architecture.png" alt="ASP.NET Core Angular2 Starter" title="ASP.NET Core Angular2 Starter">
</p>

### What is this repo?

This repository is maintained by [Angular Universal](https://github.com/angular/universal) and is meant to be an advanced starter for both ASP.NET Core using 
Angular2, not only for the client-side, but to be rendered on the *server*. 

This is meant to be a Feature-Rich Starter application containing all of the latest technologies, best build systems available, and include many real-world examples and libraries needed in todays Single Page Applications (SPAs).

This utilizes all the latest standards, no gulp, no bower, no typings, no manually "building" anything. NPM, Webpack and .NET handle everything for you!

[11/29] Fully operational, some improvements & new functionality to come, keep an eye out for the latest updates!

> NOTE: Angular Universal is currently moving to Angular Core (https://github.com/angular/angular/issues/13822), we will need to wait for that and angular v4 to finish certain aspects (aot for example)

---

# Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
* [Upcoming Features](#upcoming-features)
* [Universal Gotchas](#universal-gotchas)
* [FAQ](#faq)
* [Special Thanks](#special-thanks)
* [License](#license)

---

### Features:

> These are just some of the features found in this starter!

- **Angular2**
  - Featuring Server-side rendering (Angular Universal)
	  - Faster paints, better SEO, deep-linking, etc
  - NgRx - Reactive Redux state management architecture
    - Built to work with the real-time Redux Devtools. [Get the Chrome extension here](https://github.com/zalmoxisus/redux-devtools-extension) 
  - Baked in best-practices (follows Angular style guide)
  - Bootstrap4 (with ng2-bootstrap) - can be rendered on the server

- **Webpack build system (Webpack 2)**
  - HMR : Hot Module Reloading/Replacement 
    - NgRx utilized and setup to **hold app State between HMR builds**
  - Production builds
  - Webpack Dashboard

- **Docker support**

- **Testing frameworks**
  - Unit testing with Karma/Jasmine
  - E2E testing with Protractor

- **Productivity**
  - Typescript 2
  - Codelyzer (for Real-Sime static code analysis) 
    - VSCode & Atom provide real-time analysis out of the box.
    - **NOTE**: Does not fully work with Visual Studio yet. (Even with 1.1.0-preview)

- **ASP.NET Core 1.1**
  - RestAPI integration
  - Integration with NodeJS to provide pre-rendering, as well as any other Node module asset you want to use.
 
----
  
### Getting Started?

**Make sure you have at least Node 4.x or higher installed!**

> You'll need ASP.NET Core installed (1.0.1 or 1.1). 
> Make sure you have VStudio 2015 update 3 installed as well.

 - Fork & Clone repo
 - `npm install && dotnet restore` (if using Visual Studio it will do both of these automatically when the project is opened)
 
 > Both Visual Studio & VSCode have the neccessary (Dev & Prod) Launch files to be able to run & debug immidiately.

(Temporarily) But for VSCode, in order to see the full Production version you must go to Command Line and set the environment variable 
to: `ASPNETCORE_ENVIRONMENT=Production`, then run `webpack` manually. Then you can launch the [Production] Launch Web option from VSCode.

> Note: `set ASPNETCORE_ENVIRONMENT=Production` on Windows. `export ASPNETCORE_ENVIRONMENT=Production` on Mac/Linux.

----

# UPCOMING Features:

  - [ ] Example of NgRx (redux) transfering App State from server to client
  - [ ] AoT (Ahead-of-time compilation) production builds
  - [ ] Adding [SignalR](https://github.com/aspnet/SignalR) example
  - [ ] Update components real unit & e2e tests
  - [x] ~~NgRx (reactive Redux application state management)~~
  - [x] ~~HMR State management (hold state when hot reload occurs)~~
  - [x] ~~Unit testing with Karma/Jasmine~~
  - [x] ~~Add e2e protractor tests~~
  - [x] ~~Add codelyzer for static code analysis (VSCode / Atom only so far)~~
  - [x] ~~Angular 2.1.1+ fixes (for Universal)~~

----

# Universal "Gotchas"

> When building Universal components in Angular 2 there are a few things to keep in mind.

 - To use `templateUrl` or `styleUrls` you must use **`angular2-template-loader`** in your TS loaders.
    - This is already setup within this starter repo. Look at the webpack.config file [here](https://github.com/MarkPieszak/aspnetcore-angular2-universal/blob/master/webpack.config.js#L58-L66) for details & implementation.
 - **`window`**, **`document`**, **`navigator`**, and other browser types - _do not exist on the server_ - so using them, or any library that uses them (jQuery for example) will not work. You do have some options, if you truly need some of this functionality:
    - If you need to use them, consider limiting them to only your main.client and wrapping them situationally with the imported *isBrowser / isNode* features from Universal.  `import { isBrowser, isNode } from 'angular2-universal'`;
    - Another option is using `DOM` from ["@angular/platform-browser"](https://github.com/angular/angular/blob/e3687706c71beb7c9dbdae1bbb5fbbcea588c476/modules/%40angular/platform-browser/src/dom/dom_adapter.ts#L34)
 - Try to *limit or* **avoid** using **`setTimeout`**. It will slow down the server-side rendering process. Make sure to remove them [`ondestroy`](https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html) in Components.
   - Also for RxJs timeouts, make sure to _cancel_ their stream on success, for they can slow down rendering as well.
 - **Don't manipulate the nativeElement directly**. Use the _Renderer_. We do this to ensure that in any environment we're able to change our view.
```
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, 'font-size', 'x-large');
}
```
 - The application runs XHR requests on the server & once again on the Client-side (when the application bootstraps)
    - Use a Universal [HttpCacheService](https://github.com/MarkPieszak/aspnetcore-angular2-universal/blob/master/Client/shared/cache/api.ts#L14-L47) instead of making regular Http requests, to save certain requests so they aren't re-ran again on the Client. [demo'd here](https://github.com/MarkPieszak/aspnetcore-angular2-universal/blob/master/Client/containers/rest-test/rest-test.component.ts#L32-L40)
 - Know the difference between attributes and properties in relation to the DOM.
 - Keep your directives stateless as much as possible. For stateful directives, you may need to provide an attribute that reflects the corresponding property with an initial string value such as url in img tag. For our native `<img src="">` element the src attribute is reflected as the _src_ property of the element type `HTMLImageElement`.

----
 
### Found a Bug? Want to Contribute?

Nothing's ever perfect, but please let me know by creating an issue (make sure there isn't an existing one about it already), and we'll try and work out a fix for it! If you have any good ideas, or want to contribute, feel free to either make an Issue with the Proposal, or just make a PR from your Fork.

----
 
### FAQ

 
**How to add a route in the app**

1. Create a folder in `Client\Containers\`
2. Create a component in the folder
3. Add the container in the `Client\Containers\index.ts`
4. Add the container in the `\Client\app\platform-modules\app.common.module.ts`
5. Add the container in the `\Client\app\app.routes.ts`

**How can I disable Universal / SSR (Server-side rendering)?**

To disable SSR, go to `Views/Home/Index.cshtml` and remove `asp-prerender-module="Client/bootstrap-server"` from the `<app>` component there in the cshtml file.  

**How can I use Material2 with this Repo?**

For now, Material2 is still in beta, and isn't fully functioning with Universal (it will sometime soon though!), so temporarily disable SSR (server-side rendering) so you can use it within your application until updates come from Material, and you can have it rendered on the server as well. Read the Material docs to see how to add Material to your Angular application, with SSR disabled everything should work without any problems.

----

### Special Thanks

Many thanks go out to Steve Sanderson (@SteveSandersonMS) from Microsoft and his amazing work on JavaScriptServices and integrating the world of Node with ASP.NET Core.


----

### License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
