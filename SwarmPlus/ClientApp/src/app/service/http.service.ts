import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }
  
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  /**
   * アクセスコードを保存
   * @param code 認証コード
   */
  saveaccesstoken(code: string) {
    return this.httpClient.post(environment.backEndApi + '/login/saveaccesstoken', { code: code }, this.httpOptions);
  }
}
