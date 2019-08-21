import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../../model/calendarEvent.type';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

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
  /** カレンダーイベントオブジェクト */
  calendarEvents: CalendarEvent[] = [];
  /** 選択された日付 */
  selectedDate: string;
  /** monthViewが有効か */
  activeMonthView: boolean = true;
  constructor(private httpService: HttpService, private utilService: UtilService) { }

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth();
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
      this.blockUI.start();
      this.getCheckins(afterBeforeTimestamp.afterTimestamp, afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.checkinHistory = response;
          this.generateEvents();
          this.blockUI.stop();
          this.activeMonthView = !this.activeMonthView;
        }
      );
    }
  }

  /**
 * 特定期間のチェックインを取得する
 * @param afterTimestamp 取得する期間(始まり)
 * @param beforeTimestamp 取得する期間(終わり)
 */
  getCheckins(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779'): Observable<UsersCheckins> {
    return this.httpService.getCheckinsPerMonth(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp);
  }

  /** イベントデータを生成 */
  generateEvents() {
    this.calendarEvents = this.checkinHistory.response.checkins.items.map(
      (x, i) => {
        return ({ id: i + 1, title: x.venue.name, date: this.utilService.getDateStringFromTimestamp(x.createdAt) });
      }
    );
    this.selectedDate = this.calendarEvents[0].date;
  }

  /**
   * 表示している月のチェックインを取得する
   * @param e 表示しているカレンダーのイベントデータ
   */
  getCheckinsPerMonth(e) {
    const t: string = e['view']['title'];
    // let startDate: Date = new Date(`${t.substring(0, 4)}-0${t.substr(5, 1)}-01`);
    let startDate: Date = new Date(Number(t.substring(0, 4)), Number(t.substr(5, 1)) - 1, 1, 0, 0);
    let afterTimestamp = startDate.getTime().toString().substring(0, 10);
    startDate.setMonth(startDate.getMonth() + 1);
    startDate.setDate(0);
    startDate.setHours(23);
    startDate.setMinutes(59);
    let beforeTimestamp: string = startDate.setSeconds(59).toString().substring(0, 10);
    this.blockUI.start();
    this.getCheckins(afterTimestamp, beforeTimestamp).subscribe(
      response => {
        this.checkinHistory = response;
        this.generateEvents();
        this.blockUI.stop();
      }
    );
  }
}
