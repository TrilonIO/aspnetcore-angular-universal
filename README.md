# ASP.NET Core & Angular 4 (+) advanced starter - with Server-side prerendering!

## Fully functional - Angular4 branch merged to master 3/30/2017 - still a few tweaks needed to add in previous features

> There may be issues here and there so please create an Issue or PR if you'd like!

<p align="center">
    <img src="./docs/architecture.png" alt="ASP.NET Core Angular 2+ Starter" title="ASP.NET Core Angular 2+ Starter">
</p>

> Looking for the older 2.x branch? Go [here](https://github.com/MarkPieszak/aspnetcore-angular2-universal/tree/old-2.x-universal-branch)

### Merged 3/30/2017 - TO-DO List:

> PRs always welcome!

- Update to use npm [ngAspnetCoreEngine](https://github.com/angular/universal/pull/682) (still need to tweak a few things there)
- Fix old README to match new project
- Add Redux back in
- Add Bootstrap with SCSS
- Add REST API CRUD Demo
- Potractor e2e testing
- Add Azure application insights module (or at least demo how to use it)


# Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
* [Deployment](#deployment)
* ~~[Upcoming Features](#upcoming-features)~~
* [Application Structure](#application-structure)
* [Universal Gotchas](#universal-gotchas)
* ~~[FAQ](#faq)~~
* [Special Thanks](#special-thanks)
* [License](#license)

---

# Features:

> These are just some of the features found in this starter!

- ASP.NET 1.0 - VS2017 support now!
  - Azure delpoyment straight from VS2017
  - Built in docker support through VS2017
  - RestAPI integration
  - SignalR Chat demo! (Thanks to [@hakonamatata](https://github.com/hakonamatata)

- **Angular 4.0.0** :
  - Featuring Server-side rendering (Platform-Server (basically Angular Universal, but moved into Angular Core)
	  - Faster paints, SEO (Search-engine optimization w Title/Meta/Link tags), link-previews, etc
  - ~~NgRx - Reactive Redux state management architecture~~
    - ~~Built to work with the real-time Redux Devtools. [Get the Chrome extension here](https://github.com/zalmoxisus/redux-devtools-extension) ~
  - Baked in best-practices (follows Angular style guide)
  - Bootstrap4 (with ng2-bootstrap) - can be rendered on the server
    - ~~Bootstrap using SCSS/SASS for easy theming / styling!~~

- **Webpack build system (Webpack 2)**
  - HMR : Hot Module Reloading/Replacement 
    - ~~NgRx utilized and setup to **hold app State between HMR builds**~~
  - Production builds
  - ~~Webpack Dashboard~~

- **Testing frameworks**
  - Unit testing with Karma/Jasmine
  - ~~E2E testing with Protractor~~

- **Productivity**
  - Typescript 2
  - Codelyzer (for Real-Sime static code analysis) 
    - VSCode & Atom provide real-time analysis out of the box.
    - **NOTE**: Does not fully work with Visual Studio yet. (Even with VS2017 and .NET core 1.0)

- **ASP.NET Core 1.1**
  
  - Integration with NodeJS to provide pre-rendering, as well as any other Node module asset you want to use.

- **Azure**
  - Microsoft Application Insights setup (for MVC & Web API routing)
  - Client-side Angular2 Application Insights integration coming soon
    - https://github.com/MarkPieszak/angular-application-insights


----

----
  
# Getting Started?

**Make sure you have at least Node 4.x or higher installed!**

Make sure you have .NET Core 1.0+ installed and/or VS2017.
VS2017 will automatically install all the neccessary npm & .NET dependencies when you open the project.

Simply push F5 to start debugging !

----

----

# Deployment

### Dotnet publish
Using `dotnet publish`, when it's finished place the generated folder onto your server and use IIS to fire everything up.

### Heroku 
<a href="https://dashboard.heroku.com/new?template=https://github.com/MarkPieszak/aspnetcore-angular2-universal.git">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy on Heroku">
</a>

### Azure

```bash
git remote add azure https://your-user-name@my-angular2-site.scm.azurewebsites.net:443/my-angular2-site.git
                     // ^ get this from Azure (Web App Overview section - Git clone url)

git push --set-upstream azure master 
```

# Application Structure:

> Needs to be updated for 4.0 structure - Coming soon!

----

----

# Universal "Gotchas"

> When building Universal components in Angular 2 there are a few things to keep in mind.

 - **`window`**, **`document`**, **`navigator`**, and other browser types - _do not exist on the server_ - so using them, or any library that uses them (jQuery for example) will not work. You do have some options, if you truly need some of this functionality:
    - If you need to use them, consider limiting them to only your client and wrapping them situationally. You can use the Object injected using the PLATFORM_ID token to check whether the current platform is browser or server. 
    
    ```
     import { PLATFORM_ID } from '@angular/core';
     import { isPlatformBrowser, isPlatformServer } from '@angular/common';
     
     constructor(@Inject(PLATFORM_ID) private platformId: Object) { ... }
     
     ngOnInit() {
       if (isPlatformBrowser(this.platformId)) {
          // Client only code.
          ...
       }
       if (isPlatformServer(this.platformId)) {
         // Server only code.
         ...
       }
     }
    ```
    
     - Try to *limit or* **avoid** using **`setTimeout`**. It will slow down the server-side rendering process. Make sure to remove them [`ngOnDestroy`](https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html) in Components.
   - Also for RxJs timeouts, make sure to _cancel_ their stream on success, for they can slow down rendering as well.
 - **Don't manipulate the nativeElement directly**. Use the _Renderer2_. We do this to ensure that in any environment we're able to change our view.
```
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, 'font-size', 'x-large');
}
```
 - The application runs XHR requests on the server & once again on the Client-side (when the application bootstraps)
    - Use a cache that's transferred from server to client (TODO: Point to the example)
 - Know the difference between attributes and properties in relation to the DOM.
 - Keep your directives stateless as much as possible. For stateful directives, you may need to provide an attribute that reflects the corresponding property with an initial string value such as url in img tag. For our native element the src attribute is reflected as the src property of the element type HTMLImageElement.

----

----

# Special Thanks

Many thanks go out to Steve Sanderson ([@SteveSandersonMS](https://github.com/SteveSandersonMS)) from Microsoft and his amazing work on JavaScriptServices and integrating the world of Node with ASP.NET Core.

Also thank you to the many Contributors !
- [@AbrarJahin](https://github.com/AbrarJahin)
- [@hakonamatata](https://github.com/hakonamatata)
- [@markwhitfeld](https://github.com/markwhitfeld)
- [@Ketrex](https://github.com/Ketrex)

----
 
# Found a Bug? Want to Contribute?

Nothing's ever perfect, but please let me know by creating an issue (make sure there isn't an existing one about it already), and we'll try and work out a fix for it! If you have any good ideas, or want to contribute, feel free to either make an Issue with the Proposal, or just make a PR from your Fork.

----

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE) 

Copyright (c) 2016-2017 [Mark Pieszak](https://github.com/MarkPieszak)

Twitter: [@MarkPieszak](http://twitter.com/MarkPieszak) | Medium: [@MarkPieszak](https://medium.com/@MarkPieszak)

