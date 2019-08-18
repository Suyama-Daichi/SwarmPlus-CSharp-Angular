import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-toppage',
  templateUrl: './toppage.component.html',
  styleUrls: ['./toppage.component.css']
})
export class ToppageComponent implements OnInit {
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [dayGridPlugin];
  /** 言語設定 */
  jaLocale = jaLocale;
  @ViewChild('calendar', { read: ElementRef, static: false }) calendarComponent: FullCalendarComponent;

  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;

  constructor(private httpService: HttpService, private utilService: UtilService) { }

  ngOnInit() {
    this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth();
    this.getCheckinsPerMonth(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp);
  }


  getCheckinsPerMonth(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779') {
    this.httpService.getCheckinsPerMonth(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp).subscribe(
      response => {
        this.checkinHistory = response;
        console.log(this.checkinHistory)
      }
    );
  }
}
