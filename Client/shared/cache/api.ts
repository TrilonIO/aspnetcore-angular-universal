import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService } from './universal-cache';


@Injectable()
export class HttpCacheService {

    constructor(public _http: Http, public _cache: CacheService) { }

    get(url, options?: RequestOptionsArgs, autoClear: boolean = true) {

        // You want to return the cache if there is a response in it. 
        // This would cache the first response so if your API isn't idempotent you probably want to 
        // remove the item from the cache after you use it. LRU of 1 
        let key = url;

        if (this._cache.has(key)) {

            const cachedResponse = this._cache.get(key);

            // if autoClear is set to false, item will stay in cache until you manually clear it
            // ie: trigger CacheService.remove(url /* with the url/key used here */)

            if (autoClear) {
                // remove previous value automatically for now
                this._cache.remove(key);
            }

            return Observable.of(cachedResponse);
        }

        // note: you probably shouldn't .share() and you should write the correct logic

        return this._http.get(url, options)
            .map(res => res.json())
            .do(json => { this._cache.set(key, json); })
            .share();
    }
}
