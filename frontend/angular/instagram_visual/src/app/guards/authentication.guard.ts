import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthguardService} from "../services/authguard.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthguardService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (!this.authService.userExists()) {
      this.router.navigateByUrl("/login");
    }

    return this.authService.userExists();
  }
}
