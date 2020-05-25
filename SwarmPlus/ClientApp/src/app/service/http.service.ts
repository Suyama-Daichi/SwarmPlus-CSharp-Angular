// Todo: UUIDをこのサービスで取得するように集約
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { AccessToken } from '../model/AccessToken.type';
import { UsersCheckins, Item4, Photos } from '../model/UserCheckins.type';
import { UserInfo } from '../model/UserInfo.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * アクセストークンを検証する
   * @param targetAccessToken 検証対象のアクセストークン
   */
  VerifyAccessToken(targetAccessToken: string): Observable<UserInfo> {
    if (targetAccessToken) {
      return this.httpClient.get<any>(`${environment.backEndApi}/foursquareapi?oauth_token=${targetAccessToken}`);
    } else {
      return from([
        new UserInfo(401)
      ]);
    }
  }

  GetAccessTokenObservable(code: string): Observable<AccessToken> {
    return this.httpClient.get<AccessToken>(`${environment.backEndApi}/authenticate?code=${code}`);
  }

  /**
   * ユーザーのチェックイン履歴を取得
   * @param afterTimestamp 取得する期間(始まり)
   * @param beforeTimestamp 取得する期間(終わり)
   */
  getUserCheckins(afterTimestamp: string, beforeTimestamp: string): Observable<UsersCheckins> {
    const params = new HttpParams().set('afterTimestamp', afterTimestamp).set('beforeTimestamp', beforeTimestamp);
    return this.httpClient.get<UsersCheckins>(`${environment.backEndApi}/checkins`, { params: params });
  }

  /**
   * チェックインの詳細を取得
   * @param checkinId 詳細を取得したいチェックインのID
   */
  getCheckinDetail(checkinId: string): Observable<Item4> {
    const params = new HttpParams().set('checkinId', checkinId);
    return this.httpClient.get<Item4>(`${environment.backEndApi}/checkin`, { params: params });
  }

  /**
   * べニューの写真を返す
   * @param venueId べニューID
   */
  getVenuePhotos(venueId: string): Observable<Photos> {
    const params = new HttpParams().set('venueId', venueId);
    return this.httpClient.get<Photos>(`${environment.backEndApi}/photos`, { params: params });
  }

}
