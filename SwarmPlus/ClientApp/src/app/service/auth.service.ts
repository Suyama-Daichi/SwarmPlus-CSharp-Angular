import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import * as uuidGenerator from 'uuid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService) { }

  /** UUIDを生成 */
  getUuid(): string {
    return uuidGenerator.v4();
  }

  /** Foursquareの認証のアクセストークンがDBに存在しているか */
  isAuthedFoursquare(uuid): Observable<boolean> {
    return this.httpService.hasaccesstoken(uuid);
  }
}
