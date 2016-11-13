import { ApplicationRef, NgModuleRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';

import 'rxjs/add/operator/take';


// This variable will contain the application state after a module has been
// unloaded. From here it is read to the next application version when it's
// loaded (see app/app.module.ts).
export let appState: any;

// Called from main.ts when a hot bootstrap should be done.
// This function is called every time the application loads
// (first when the page loads, and then again after each hot reload)
export function handleHmr(
  module: any, // The module that we're handling HMR for (it'll be the main.ts module)
  bootstrap: () => Promise<NgModuleRef<any>>) { // The bootstrap function (comes from main.ts)

  // Store a reference to the NgModule that we will bootstrap.
  // We'll need it during unload.
  let moduleRef: NgModuleRef<any>;

  // Bootstrap the module and grab the NgModule reference from the
  // promise when it's resolved. This will start the application.
  bootstrap()
    .then(mod => moduleRef = mod);

  // Let Webpack know that we can handle hot loading for this module
  module.hot.accept();

  // Attach a callback to module unload. This'll be called during a hot
  // reload, before the new version of the application comes in. We need to:
  // 1) Grab the current state of the previous application so we can reuse it.
  // 2) Destroy the previous application so that the new one can load cleanly.
  module.hot.dispose(() => {
    // Grab a reference to the running Angular application.
    const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
    // Grab a reference to the application's @ngrx/store.
    const store: Store<any> = moduleRef.injector.get(Store);
    // Get the current state from the Store. The store is an Observable so
    // we can use the Observable API to get the state. We'll get it synchronously
    // though this code may look like we might not.
    store.take(1).subscribe(s => {
      appState = s;
    });

    // When an Angular app is destroyed, it will also remove the DOM elements
    // of its root component(s) from the page. When doing hot loading, this is
    // a problem because the next version of the app will have nothing to
    // attach to. We need to clone the DOM nodes of the current application's root
    // component(s)
    const cmpLocations = appRef.components.map(cmp => cmp.location.nativeElement);
    const disposeOldHosts = createNewHosts(cmpLocations);
    moduleRef.destroy();
    removeNgStyles();
    disposeOldHosts();

    // After this, the next version of the app will load momentarily.
    // Webpack dev server will execute the new `main.ts` which will then call 
    // `handleHmr` again...
  });

}
