# ASP.NET Core & Angular 4 (+) advanced starter - with Server-side prerendering!

## Fully functional - 4.0 merged 3/30/2017 - tweaking Master to add in previous features

> Looking for the older 2.x branch? Go [here](https://github.com/MarkPieszak/aspnetcore-angular2-universal/tree/old-2.x-universal-branch)

<p align="center">
    <img src="./docs/architecture.png" alt="ASP.NET Core Angular 2+ Starter" title="ASP.NET Core Angular 2+ Starter">
</p>

### Merged 3/30/2017 - TO-DO List:

> PRs always welcome!

- Fix old README to match new project
- Add Redux back in
- Add Bootstrap with SCSS
- Add REST API CRUD Demo
- Potractor e2e testing
- Add Azure application insights module (or at least demo how to use it)


# Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)
* ~~[Deployment](#deployment)~~
* ~~[Upcoming Features](#upcoming-features)~~
* ~~[Application Structure](#application-structure)~~
* ~~[Universal Gotchas](#universal-gotchas)~~
* ~~[FAQ](#faq)~~
* ~~[Special Thanks](#special-thanks)~~
* ~~[License](#license)~~

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

