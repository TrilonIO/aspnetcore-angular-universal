import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

interface IXhrCache {
    method: string;
    response: Response;
}

@Injectable()
export class XhrService {

    private method = '';
    public responseList: Array<IXhrCache>;

    constructor(private http: Http) {
        
    }

    store(xhr) {
    }
    
    getResponse(methodName): Response {
        for (let i = 0; i < this.responseList.length; i++) {
            if (methodName === this.responseList[i].method) {
                return this.responseList[i].response;
            }
        }
        return null;
    }

    cacheResponse(xhrCacheObject : IXhrCache): boolean {
        this.responseList.push(xhrCacheObject);
        return true;
    }
}