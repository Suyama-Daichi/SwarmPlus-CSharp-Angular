import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    /** 認可URL */
    authenticateURL = environment.authenticateURL;
    /** リダイレクトURL */
    redirectUrl = environment.redirectUrl;
  constructor(
    private router: Router,
    private httpService: HttpService
    ) { }

  ngOnInit() {
    this.httpService.VerifyAccessToken(localStorage.getItem('token')).subscribe(
      response => {
        if (response.meta.code !== 401) {
          this.router.navigateByUrl('/month');
        }
      }
    );
  }
}
