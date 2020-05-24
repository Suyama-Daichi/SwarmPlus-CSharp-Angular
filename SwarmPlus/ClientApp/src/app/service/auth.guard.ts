import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StoreService } from '../rxjs/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private httpService: HttpService,
    private storeService: StoreService
  ) { }

  /**
   * 参考：https://www.freakyjolly.com/angular-7-6-use-auth-guards-canactivate-and-resolve-in-angular-routing-quick-example/
   */
  canActivate() {
    return this.httpService.VerifyAccessToken(localStorage.getItem('token')).pipe(
      map(response => {
        if (response.statusCode === 401) {
          this.router.navigate(['']);
          return false;
        }
        this.storeService._userInfo$.next(response);
        return true;
      })
    );
  }
}
