import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { environment } from '../../environments/environment';
import *  as uuidGenerator from "uuid";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  /** バックエンドAPI */
  authenticateURL = environment.authenticateURL;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.isAuthedFoursquare()
  }

  /** Foursquareにログインしているか */
  isAuthedFoursquare() {
    let uuid = localStorage.getItem('uuid');
    this.httpService.hasaccesstoken(uuid).subscribe(
      (response: Response) => { },
      (error: Error) => {
        uuid = uuidGenerator.v4();
        localStorage.setItem('uuid', uuid);
      }
    );
  }
}
