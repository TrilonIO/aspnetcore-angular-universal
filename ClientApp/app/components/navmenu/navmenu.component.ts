import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'nav-menu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})

export class NavMenuComponent implements OnInit {
  collapse: string = "collapse";
  isAuthenticated: boolean;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  collapseNavbar(): void {
    if (this.collapse.length > 1) {
      this.collapse = "";
    } else {
      this.collapse = "collapse";
    }
  }

  collapseMenu() {
    this.collapse = "collapse"
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
