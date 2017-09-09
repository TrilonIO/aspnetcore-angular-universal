import { Component, OnInit, Inject } from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../shared/authentication.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  wrongPassword: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.wrongPassword = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.name, this.model.password)
      .subscribe(
      data => {
        this.wrongPassword = false;
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.wrongPassword = true;
        this.loading = false;
      });
  }
}
