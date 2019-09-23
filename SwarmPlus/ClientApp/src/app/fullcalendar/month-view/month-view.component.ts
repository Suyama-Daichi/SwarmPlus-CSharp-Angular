import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../../model/calendarEvent.type';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  selectedDate: Date;
  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** カレンダーイベントオブジェクト */
  calendarEvents: CalendarEvent[] = [];
  /** 詳細コンポーネントが開かれているか */
  isDetailOpen: boolean;
  /** 詳細表示するチェックインデータ */
  checkinData: Item4;

  /** 今日の日付(未来の日付を選択させないため) */
  nowDate = { end: new Date() };

  /** monthViewが有効か */
  @Input() activeMonthView: boolean = true;
  constructor(private httpService: HttpService, private utilService: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getUserCheckins();
  }

  /**
   * 初期データ取得
   */
  getUserCheckins() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const y = params.get('year'), m = params.get('month');
      this.selectedDate = y === null || m === null || typeof y !== 'number' || typeof m !== 'number' ? new Date() : new Date(Number(y), Number(m) - 1);
      this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
      this.blockUI.start();
      this.getCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.checkinHistory = response;
          this.generateEvents(this.checkinHistory.response.checkins.items);
          this.blockUI.stop();
        }
      );;
    });
  }

  /**
   * 日付を押下したときに発火される
   * https://stackoverflow.com/questions/56261140/dateclick-not-emitted-in-fullcalendar-angular
   * @param event 日付のクリックイベント
   */
  onDateClick(event) {
    this.router.navigate(['day', this.utilService.getDateStringFromTimestamp(Number(this.utilService.getTimestamp(event.dateStr).afterTimestamp))]);
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
   * 詳細表示する
   */
  openDetail(e) {
    this.isDetailOpen = true;
    this.checkinData = e['event']['_def']['extendedProps']['checkinData'];
  }
}
