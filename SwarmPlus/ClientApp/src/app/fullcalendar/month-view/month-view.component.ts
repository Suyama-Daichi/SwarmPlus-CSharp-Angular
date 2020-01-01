import { SelectedCategory } from './../../model/selectedCategory.type';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
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
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, AfterViewInit {
  /** 表示対象の年月日 */
  selectedDate: Date;
  /** Momentのインスタンス */
  momentApi: moment.Moment;
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
  checkinId: string;
  /** 今日の日付(未来の日付を選択させないため) */
  nowDate = { end: new Date() };
  /** カレンダーのインスタンス */
  @ViewChild('calendar', { static: false }) calenderComponent: FullCalendarComponent;
  calendarApi: Calendar;
  /** サイドバーコンポーネントから受け取った絞り込み条件を保持 */
  searchCondition: SelectedCategory[];
  constructor(
    private httpService: HttpService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getUserCheckins();
  }
  ngAfterViewInit() {
    this.calendarApi = this.calenderComponent.getApi();
  }
  /**
   * 初期データ取得
   */
  getUserCheckins() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const y = params.get('year'), m = params.get('month');
      this.momentApi = moment(y === null || m === null || !y.match(/19[0-9]{2}|20[0-9]{2}/g) || !m.match(/[1-9]|1[0-2]/g) ? new Date() : new Date(`${y}-${m}`));
      this.selectedDate = this.momentApi.toDate();
      this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth(this.selectedDate);
      this.blockUI.start();
      this.getCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.checkinHistory = response;
          this.calendarEvents = this.utilService.generateEvents(this.checkinHistory.response.checkins.items);
          this.filterCheckins(this.searchCondition);
          this.calendarApi.gotoDate(this.selectedDate);
          this.blockUI.stop();
        }
      );
    });
  }

  /** フィルター */
  filterCheckins(e: SelectedCategory[]) {
    this.calendarEvents = this.utilService.filterCheckin((this.checkinHistory.response.checkins.items), e);
  }

  /** 日付操作 */
  onLastYear() {
    this.isDetailOpen = false;
    const currentDisplayDate: moment.Moment = moment(this.calendarApi.getDate());
    currentDisplayDate.subtract(1, 'year');
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onLastYearMonth() {
    this.isDetailOpen = false;
    const currentDisplayDate: moment.Moment = moment();
    currentDisplayDate.subtract(1, 'year');
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onThisMonth() {
    this.isDetailOpen = false;
    const currentDisplayDate: moment.Moment = moment();
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onPrevMonth() {
    this.isDetailOpen = false;
    const currentDisplayDate: moment.Moment = moment(this.calendarApi.getDate());
    currentDisplayDate.subtract(1, 'months');
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onNextMonth() {
    this.isDetailOpen = false;
    if (this.momentApi < moment(Number(this.utilService.getFirstDateAndLastDateOfThisMonth(new Date()).afterTimestamp) * 1000)) {
      const currentDisplayDate: moment.Moment = moment(this.calendarApi.getDate());
      currentDisplayDate.add(1, 'months');
      this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
    }
  }

  /**
   * 日付を押下したときに発火される
   * https://stackoverflow.com/questions/56261140/dateclick-not-emitted-in-fullcalendar-angular
   * @param event 日付のクリックイベント
   */
  onDateClick(event) {
    this.router.navigateByUrl(`day/${event.dateStr.replace(/-/g, '/')}`);
  }

  /**
 * 特定期間のチェックインを取得する
 * @param afterTimestamp 取得する期間(始まり)
 * @param beforeTimestamp 取得する期間(終わり)
 */
  getCheckins(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779'): Observable<UsersCheckins> {
    return this.httpService.getUserCheckins(afterTimestamp, beforeTimestamp);
  }

  /**
   * 詳細表示する
   */
  openDetail(e) {
    this.isDetailOpen = true;
    this.checkinId = e['event']['_def']['extendedProps']['checkinData'].id;
  }

  /** サイドバーから検索条件を受けとる */
  catchSearchCondition(e: SelectedCategory[]) {
    this.searchCondition = e;
    // 二次元配列を一次元配列に変換
    this.filterCheckins(e);
  }

}
