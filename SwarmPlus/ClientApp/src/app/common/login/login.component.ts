import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { AuthInfo } from '../../model/auth.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.getCode();
  }

  /**
   * 認証コード取得
   */
  getCode() {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        const queryParam = this.route.snapshot.queryParamMap.get('code');
        this.saveAccessToken(queryParam);
      });
  }

  /**
   * アクセストークンを保存
   * @param queryParam 認可コード
   */
  saveAccessToken(queryParam: string) {
    const authInfo: AuthInfo = { Code: queryParam, Uuid: localStorage.getItem('uuid') };
    this.httpService.saveaccesstoken(authInfo).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
