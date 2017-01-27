# Changelog

> This is a manual changelog at the moment to track the Major changes in the Repo.

## How do I stay up to date when Updates happen in this Starter?

Typically when you want to update your App with the latest from this repo, you should be able to get the latest from here
 and (depending on what has changed), you should be able to just drop in your Client & Server folders on top.

My goal is to point out the more **"Major"** issues & changes below, that might have affected the application in Client/Server aspects. 
For example, some additions made to each platform to add a new Feature (such as Storage that's using dependeny injection). 
Of course if some feature like that isn't important to you, there's no need to copy it over! A lot examples here are to get you up & 
running with a lot of the eco-system of .NET Core & Angular (v2+).

Don't hesitate to create an Issue with anything you run into, and Pull-Requests are always welcome for basic implementations of new features & fixes 
you think others would benefit from as well!

### 1.0.0-beta.4 - 1/27/2017
- [Closes #48](https://github.com/MarkPieszak/aspnetcore-angular2-universal/issues/48) Feature: Add CSRF Token cookie so Angular & .NET Core can validate it. - [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/5d0cbe48245889a2b6f1cdfb67bad492d80c85c5)
- Feature: Sample Entity Framework Core added - [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/b132d6a5707ccdb826b2cfbc2d8610343901b452)
- Updated Webpack to 2.2.0 

### 1.0.0-beta.3 - 1/23/2017

- [Closes #32](https://github.com/MarkPieszak/aspnetcore-angular2-universal/issues/32) Feature: Added automatic Title update on Route change based on Route `data:{title:''}` - 
[commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/b2f15cd16d2dcc43df30b9549d1cf2ced90f66e2)

- [Closes #35](https://github.com/MarkPieszak/aspnetcore-angular2-universal/issues/35) Implemented Storage service for 
Browser (localStorage) & Server (in memory variable) - [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/a5b3be3cf35c9da4c2bd7b3ede98b07f243cfeac)

- [Closes #34](https://github.com/MarkPieszak/aspnetcore-angular2-universal/issues/45) Fix karma to handle Angular 
testing - [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/1777f43ca23ede6c46d3cd37c1a2d35605a1355d)


### 1.0.0-beta.2 - 1/14/2017

- Update AppComponent to be `<app-root />` to satisfy TSLint. `bootstrap-server.ts` updated as well.

- Partial revert of ng2-bootstrap dependency down to **1.1.16**, 1.1.20+ require ng 2.4.x (unsupported by Universal atm) [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/524df2df00113d0ee2953b44ae40167112192f89)

- [Closes #33](https://github.com/MarkPieszak/aspnetcore-angular2-universal/issues/33) Update CSS for bootstrap4 & fix ng2-bootstrap API changes  [commit](https://github.com/MarkPieszak/aspnetcore-angular2-universal/commit/d0c0e7d98b9ac043be9880ba2656ddf0f0f2222d)
