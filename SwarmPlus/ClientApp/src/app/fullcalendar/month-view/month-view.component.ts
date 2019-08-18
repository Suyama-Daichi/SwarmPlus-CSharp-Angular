import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../../model/calendarEvent.type';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** HTTP通信が終わったかどうか */
  isLoadFinished = false;
  calendarEvents: CalendarEvent[] = [];
  constructor(private httpService: HttpService, private utilService: UtilService) { }


  ngOnInit() {
    this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth();
    this.getCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp);
  }

    /**
   * 日付を押下したときに発火される
   * https://stackoverflow.com/questions/56261140/dateclick-not-emitted-in-fullcalendar-angular
   * @param event 日付のクリックイベント
   */
  calenderClick(event) {
    console.log(event);
    let afterBeforeTimestamp = this.utilService.getTimestamp(event.dateStr);
    // 未来のチェックインは取得しない
    if (Number(afterBeforeTimestamp.afterTimestamp) <= Number(new Date().getTime().toString().substring(0, 10))) {
      this.getCheckins(afterBeforeTimestamp.afterTimestamp, afterBeforeTimestamp.beforeTimestamp);
    }
    console.log(afterBeforeTimestamp);
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
        this.generateEvents();
      }
    );
  }

  /** イベントデータを生成 */
  generateEvents() {
    this.checkinHistory.response.checkins.items.forEach(
      (x, i) => {
        this.calendarEvents = this.calendarEvents.concat({ id: i + 1, title: x.venue.name, date: this.utilService.getDateStringFromTimestamp(x.createdAt) });
        this.isLoadFinished = true;
      }
    );
    console.log(this.calendarEvents)
  }
}
