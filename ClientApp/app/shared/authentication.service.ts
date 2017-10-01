import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { ORIGIN_URL } from './constants/baseurl.constants';
import { IUser } from '../models/User';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  constructor(
    private transferHttp: TransferHttp, // Use only for GETS that you want re-used between Server render -> Client render
    private http: Http, // Use for everything else
    @Inject(ORIGIN_URL) private baseUrl: string) {

  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/api/auth/authenticate', { name: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }).catch(this.handleError);
  }
  authenticated(): Observable<boolean> {
    return this.http.get(this.baseUrl + '/api/auth/authenticate', this.jwt())
      .map(() => true)
      .catch(() => {
        this.logout();
        return Observable.of(false);
      });
  }

  checkAccess(): boolean {
    try {
      let user = localStorage.getItem('currentUser');

      if (user === undefined || user === null) {
        return (false);
      }
      else {
        return (true);
      }
    }
    catch (e)
    { }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');

  }

  private jwt() {
    try {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
      }
    }
    catch (e)
    { }
  }

  private handleError(error: any): Promise<any> {
    this.logout();
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
