import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  /**
   * login
   */
  public login() {
    return this.httpClient.get(environment.backEndApi + '/login');
  }
}
