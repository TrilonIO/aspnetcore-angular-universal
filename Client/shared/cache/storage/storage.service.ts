import { Injectable } from '@angular/core';

// This is our "shell" Service that will be used through out the application

// Each "platform" will inject its own implementation (storage.browser & storage.node)
// Browser is using window.localStorage
// Node is using inMemory variable Object (which can work for most scenarios),
// If you needed a true cache you'd need to implement Redis or similar here.

// Useage within the app:
//    constructor (private storage: StorageService) {}

// this.storage.setItem('someKey', 123);

@Injectable()
export class StorageService {
    getItem = (key) : any => {};
    setItem = (key, value) => {};
    removeItem = (key) => {};
    clear = () => {};
}
