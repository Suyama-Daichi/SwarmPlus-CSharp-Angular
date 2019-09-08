import { CheckinDetailComponent } from './../../modal/checkin-detail/checkin-detail.component';
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
import { SimpleModalService } from 'ngx-simple-modal';
import { Router } from '@angular/router';

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

  /** 今日の日付(未来の日付を選択させないため) */
  nowDate = { end: new Date() };

  /** monthViewが有効か */
  @Input() activeMonthView: boolean = true;
  constructor(private httpService: HttpService, private utilService: UtilService, private simpleModalService: SimpleModalService, private router: Router) { }

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
  onDateClick(event) {
    this.router.navigate(['day', this.utilService.getDateStringFromTimestamp(Number(this.afterBeforeTimestamp.afterTimestamp))]);
  }

  /**
 * 特定期間のチェックインを取得する
 * @param afterTimestamp 取得する期間(始まり)
 * @param beforeTimestamp 取得する期間(終わり)
 */
  getCheckins(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779'): Observable<UsersCheckins> {
    return this.httpService.getUserCheckins(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp);
  }

  /** イベントデータを生成 */
  generateEvents(items: Item4[]) {
    // チェックインデータが0件の時はイベントデータを生成しない
    if (items.length !== 0) {
      this.calendarEvents = this.utilService.generateEvents(items);
    }
  }

  /**
   * 表示している月のチェックインを取得する
   * @param e 表示しているカレンダーのイベントデータ
   */
  getUserCheckins(e) {
    const t: string = e['view']['title'];
    const afterDate: Date = new Date(Number(t.substring(0, 4)), Number(t.substr(5, 1)) - 1, 1, 0, 0);
    const afterTimestamp = afterDate.getTime().toString().substring(0, 10);
    afterDate.setMonth(afterDate.getMonth() + 1);
    afterDate.setDate(0);
    afterDate.setHours(23);
    afterDate.setMinutes(59);
    afterDate.setSeconds(59)
    const beforeTimestamp: string = afterDate.getTime().toString().substring(0, 10);
    this.blockUI.start();
    this.getCheckins(afterTimestamp, beforeTimestamp).subscribe(
      response => {
        this.checkinHistory = response;
        this.generateEvents(this.checkinHistory.response.checkins.items);
        this.blockUI.stop();
      }
    );
  }

  /**
   * モーダルを開く
   */
  openModal(e) {
    const checkinData: Item4 = e['event']['_def']['extendedProps']['checkinData'];
    this.simpleModalService.addModal(CheckinDetailComponent, checkinData).subscribe(
      (isOpened) => {
        console.log(isOpened);
      }
    );
  }
}
