import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  /**
   * 参考：https://www.freakyjolly.com/angular-7-6-use-auth-guards-canactivate-and-resolve-in-angular-routing-quick-example/
   */
  canActivate(): Observable<boolean> {
    return this.authService.isAuthedFoursquare(localStorage.getItem('uuid')).pipe(
      map(response => {
        if(response){
          return true;
        }
      }),
      catchError((err) => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }

}
