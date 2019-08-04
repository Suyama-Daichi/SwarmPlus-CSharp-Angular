import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthInfo } from '../model/auth.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }
  
  /** ヘッダー情報 */
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  /**
   * アクセストークンを保存
   * @param authInfo 認証コードとUUID
   */
  saveaccesstoken(authInfo: AuthInfo) {
    console.log(authInfo);
    return this.httpClient.post(environment.backEndApi + '/login/saveaccesstoken', authInfo, this.httpOptions);
  }

  /**
   * アクセストークンを取得しているか確認
   * @param uuid ユーザーID(UUID)
   */
  hasaccesstoken(uuid: string){
    return this.httpClient.get(environment.backEndApi + '/login/hasaccesstoken', {params: {uuid: uuid}})
  }
}
