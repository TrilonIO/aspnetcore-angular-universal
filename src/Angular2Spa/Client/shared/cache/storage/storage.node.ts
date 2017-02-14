import { StorageService } from './storage.service';

// Our pseudo server Storage we'll use on the server to replace localStorage
// This can handle most scenarios, but if you truly needed a server Memory Cache
// you'd want to use Redis or something here
let fakeInMemoryStore = {};

export class ServerStorage implements StorageService {
    getItem(key) {
        return fakeInMemoryStore[key] || undefined;
    }
    setItem(key, value) {
        return fakeInMemoryStore[key] = value;
    }
    removeItem(key) {
        try {
            delete fakeInMemoryStore[key];
        } catch (ex) { }
    }
    clear() {
        fakeInMemoryStore = {};
    }
}
