import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';

@Component({
  selector: 'app-toppage',
  templateUrl: './toppage.component.html',
  styleUrls: ['./toppage.component.css']
})
export class ToppageComponent implements OnInit {
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** HTTP通信が終わったかどうか */
  isLoadFinished = false;
  calendarEvents = [];

  constructor(private httpService: HttpService, private utilService: UtilService) { }

  ngOnInit() {
    this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth();
    this.getCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp);
  }

  /**
   * 特定期間のチェックインを取得する
   * @param afterTimestamp 取得する期間(始まり)
   * @param beforeTimestamp 取得する期間(終わり)
   */
  getCheckins(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779') {
    this.httpService.getCheckinsPerMonth(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp).subscribe(
      response => {
        this.checkinHistory = response;
        console.log(this.checkinHistory.response.checkins)
        this.generateEvents();
      }
    );
  }

  generateEvents() {
    this.checkinHistory.response.checkins.items.forEach(
      (x, i) => {
        this.calendarEvents = this.calendarEvents.concat({ id: i, title: x.venue.name, date: this.utilService.getDateStringFromTimestamp(x.createdAt) });
        this.isLoadFinished = true;
      }
    );
    console.log(this.calendarEvents)
  }

}
