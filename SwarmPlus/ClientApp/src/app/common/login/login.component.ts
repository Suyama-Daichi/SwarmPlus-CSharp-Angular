import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.getCode();
  }

  /**
   * 認証コード取得
   */
  getCode() {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        this.GetAccessTokenObservable(this.route.snapshot.queryParamMap.get('code'));
      });
  }

  GetAccessTokenObservable(code: string) {
    this.httpService.GetAccessTokenObservable(code).subscribe(
      (response: AccessToken) => {
        localStorage.setItem('token', response.access_token);
        this.router.navigateByUrl('/top');
      });
  }
}
