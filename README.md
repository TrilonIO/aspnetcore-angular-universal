# ASP.NET Core & Angular2 Universal starter

### What does this repo include?

- Angular2
  - Featuring Server-side rendering (Angular Universal)
	- Faster paints, better SEO, deep-linking, etc
  - Baked in best-practices (follows Angular style guide)
  - Bootstrap4 (with ng2-bootstrap) - can be rendered on the server

- Webpack build system
  - HMR : Hot Module Reloading/Replacement 
  - Production builds

- Testing frameworks
  - Unit testing with Karma/Jasmine
  - Codelyzer (for real-time static code analysis) `npm run lint`
	- *Note, only VSCode & Atom can provide real-time code analysis at this moment*

- asp.NET Core 1.0.1
  - RestAPI integration
  - Integration with NodeJS to provide pre-rendering, as well as any other Node module asset you want to use.
  
### Getting Started?

> You'll need ASP.NET Core installed (1.0.1). 
> Make sure you have VStudio 2015 update 3 installed as well.

 - Fork & Clone repo
 - `npm install && dotnet restore` (if using Visual Studio it will do both of these automatically when the project is opened)
 
 > Both Visual Studio & VSCode have the neccessary Launch files to be able to run & debug immidiately.

Make sure to be aware of [Universal's (isomorphic javascripts) **"Gotchas"**](https://github.com/angular/universal-starter#universal-gotchas)

### UPCOMING Features:

  - [ ] NgRx (reactive Redux application state management) TODO
  - [ ] Unit testing with Karma/Jasmine TODO
  - [ ] HMR State management
  - [ ] Angular 2.1.1+ fixes (for Universal)
  - [ ] Websockets example
