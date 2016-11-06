# ASP.NET Core & Angular2 Universal starter

## - Fully functioning (some additional features coming soon!)

### What does this starter include?

- Angular2
  - Featuring Server-side rendering (Angular Universal)
	- Faster paints, better SEO, deep-linking, etc
  - Baked in best-practices (follows Angular style guide)
  - Bootstrap (with ng2-bootstrap)

- Webpack build system
  - HMR : Hot Module Reloading/Replacement 
  - Production builds

- asp.NET Core
  - Integration with NodeJS to provide pre-rendering, as well as any other Node module asset you want to use.
  
### Getting Started?

 - Fork & Clone repo
 - `npm install && dotnet restore` (if using Visual Studio it will do both of these automatically when the project is opened)
 
 > Both Visual Studio & VSCode have the neccessary Launch files to be able to run & debug immidiately.

Make sure to be aware of [Universal's (isomorphic javascripts) **"Gotchas"**](https://github.com/angular/universal-starter#universal-gotchas)

### UPCOMING Features:

  - NgRx (reactive Redux application state management) TODO
  - Unit testing with Karma/Jasmine TODO
  - HMR State management
  - Angular 2.1.1+ fixes (for Universal)
  - Websockets example
