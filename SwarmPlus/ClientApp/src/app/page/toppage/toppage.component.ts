import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-toppage',
  templateUrl: './toppage.component.html',
  styleUrls: ['./toppage.component.css']
})
export class ToppageComponent implements OnInit {
  checkinHistory: UsersCheckins;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getCheckinsPerMonth();
  }


  getCheckinsPerMonth(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779') {
    this.httpService.getCheckinsPerMonth(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp).subscribe(
      response=> {
        this.checkinHistory = response;
      }
    );
  }

}
