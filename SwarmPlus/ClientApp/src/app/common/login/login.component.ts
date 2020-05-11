import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { AccessToken } from '../../model/AccessToken.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.GetAccessTokenObservable(this.route.snapshot.queryParamMap.get('code'));
  }

  GetAccessTokenObservable(code: string) {
    this.httpService.GetAccessTokenObservable(code).subscribe(
      (response: AccessToken) => {
        localStorage.setItem('token', response.access_token);
        location.href = 'month';
      });
  }
}
