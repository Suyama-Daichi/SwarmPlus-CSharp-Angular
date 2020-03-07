// Todo: UUIDをこのサービスで取得するように集約
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AccessToken } from '../model/AccessToken.type';
import { UsersCheckins, Item4, Photos } from '../model/UserCheckins.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * アクセストークンを検証する
   * @param targetAccessToken 検証対象のアクセストークン
   */
  VerifyAccessToken(targetAccessToken: string): Observable<any> {
    return this.httpClient.get<any>(`https://1vxd5j4ny1.execute-api.ap-northeast-1.amazonaws.com/request-to-foursquare-test/foursquareapi?oauth_token=${targetAccessToken}`);
  }

  GetAccessTokenObservable(code: string): Observable<AccessToken> {
    return this.httpClient.get<AccessToken>(`https://1vxd5j4ny1.execute-api.ap-northeast-1.amazonaws.com/authenticate-test/authenticate?code=${code}`);
  }

  /**
   * ユーザーのチェックイン履歴を取得
   * @param afterTimestamp 取得する期間(始まり)
   * @param beforeTimestamp 取得する期間(終わり)
   */
  getUserCheckins(afterTimestamp: string, beforeTimestamp: string): Observable<UsersCheckins> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'bearer ' + this.getAccessToken());
    const params = new HttpParams().set('afterTimestamp', afterTimestamp).set('beforeTimestamp', beforeTimestamp);
    return this.httpClient.get<UsersCheckins>(environment.backEndApi + '/foursquareapi/getCheckinsPerMonth', { headers: headers, params: params });
  }

  /**
   * チェックインの詳細を取得
   * @param checkinId 詳細を取得したいチェックインのID
   */
  getCheckinDetail(checkinId: string): Observable<Item4> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'bearer ' + this.getAccessToken());
    const params = new HttpParams().set('checkinId', checkinId);
    return this.httpClient.get<Item4>(environment.backEndApi + '/foursquareapi/getcheckindetail', { headers: headers, params: params });
  }

  /**
   * べニューの写真を返す
   * @param venueId べニューID
   */
  getVenuePhotos(venueId: string): Observable<Photos> {
    const params = new HttpParams().set('venueId', venueId);
    return this.httpClient.get<Photos>(environment.backEndApi + '/foursquareapi/getVenuePhotos', { params: params });
  }

}
