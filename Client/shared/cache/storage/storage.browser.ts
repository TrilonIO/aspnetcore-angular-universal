import { StorageService } from './storage.service';

export class BrowserStorage implements StorageService {
    getItem (key: string): any {
        let storedItem = window.localStorage.getItem(key);
        try {
            return JSON.parse(storedItem);
        } catch (ex) {
            return storedItem;
        }
    } 

    setItem (key: string, value: any) {
        // We need to try and stringify it first (we can't save Objects/etc or it'll error out)
        if (typeof value !== 'string') {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            window.localStorage.setItem(key, value);
        }
    }
    
    removeItem (key: string) {
        window.localStorage.removeItem(key);
    }

    clear () {
        window.localStorage.clear();
    }
}