import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../../service/http.service';

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
        this.httpService.saveaccesstoken(queryParam).subscribe(
          response => {
            console.log(response);
          }
        );
      });
  }
}
