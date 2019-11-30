// Todo: UUIDをこのサービスで取得するように集約
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthInfo } from '../model/auth.type';
import { Observable } from 'rxjs';

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
   * ローカルストレージからUUIDを取得
   */
  getUuid(): string{
    return localStorage.getItem('uuid');
  }

  getAccessToken(): string{
    return localStorage.getItem('token');
  }

  /**
   * アクセストークンを取得
   * @param authInfo 認証コードとUUID
   */
  async GetAccessTokenPromise(code: string): Promise<AccessToken> {
    // return this.httpClient.post(environment.backEndApi + '/login/saveaccesstoken', authInfo, this.httpOptions);
    return this.httpClient.get<AccessToken>(`https://1vxd5j4ny1.execute-api.ap-northeast-1.amazonaws.com/authenticate-test/authenticate?code=${code}`).toPromise();
  }

  GetAccessTokenObservable(code: string): Observable<AccessToken> {
    return this.httpClient.get<AccessToken>(`https://1vxd5j4ny1.execute-api.ap-northeast-1.amazonaws.com/authenticate-test/authenticate?code=${code}`);
  }

  /**
   * アクセストークンを取得しているか確認
   * @param uuid ユーザーID(UUID)
   */
  hasaccesstoken(uuid: string): Observable<boolean> {
    return new Observable();
    // return this.httpClient.get<any>(environment.backEndApi + '/login/hasaccesstoken', { params: { uuid: uuid } })
  }

  /**
   * ユーザーのチェックイン履歴を取得
   * @param afterTimestamp 取得する期間(始まり)
   * @param beforeTimestamp 取得する期間(終わり)
   */
  getUserCheckins(afterTimestamp: string, beforeTimestamp: string): Observable<UsersCheckins> {
    const params = new HttpParams().set('uuid', this.getAccessToken()).set('afterTimestamp', afterTimestamp).set('beforeTimestamp', beforeTimestamp);
    return this.httpClient.get<UsersCheckins>(environment.backEndApi + '/foursquareapi/getCheckinsPerMonth', { params: params });
  }

  /**
   * チェックインの詳細を取得
   * @param checkinId 詳細を取得したいチェックインのID
   */
  getCheckinDetail(checkinId: string): Observable<Item4>{
    const params = new HttpParams().set('uuid', this.getUuid()).set('checkinId', checkinId);
    return this.httpClient.get<Item4>(environment.backEndApi + '/foursquareapi/getcheckindetail', {params: params});
  }

  /**
   * べニューの写真を返す
   * @param venueId べニューID
   */
  getVenuePhotos(venueId: string): Observable<Photos>{
    const params = new HttpParams().set('venueId', venueId);
    return this.httpClient.get<Photos>(environment.backEndApi + '/foursquareapi/getVenuePhotos', {params: params });
  }

}
