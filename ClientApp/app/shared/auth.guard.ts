import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service'
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.authenticated()
      .map(
      data => {
        if (data) {
          try {
            if (localStorage.getItem('currentUser')) {
              return true;
            }
          }
          catch (e) {
            return false;
          }
        }
        this.router.navigate(['/**']);
        return false
      },
      error => {
        this.router.navigate(['/**']);
        return false;
      });
  }
}
