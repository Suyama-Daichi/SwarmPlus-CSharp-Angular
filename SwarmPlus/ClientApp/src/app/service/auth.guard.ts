import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private httpService: HttpService) { }

  /**
   * 参考：https://www.freakyjolly.com/angular-7-6-use-auth-guards-canactivate-and-resolve-in-angular-routing-quick-example/
   */
  canActivate() {
    return this.httpService.VerifyAccessToken(localStorage.getItem('token')).pipe(
      map(response => {
        if (response.meta.code === 401) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
