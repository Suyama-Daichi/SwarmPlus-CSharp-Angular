import { Component, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
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
  checkinData: Item4;
  /** 今日の日付(未来の日付を選択させないため) */
  nowDate = { end: new Date() };
  /** カレンダーのインスタンス */
  @ViewChild('calendar', { static: false }) calenderComponent: FullCalendarComponent;
  calendarApi: Calendar;
  constructor(private httpService: HttpService, private utilService: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
      this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
      this.blockUI.start();
      this.getCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.checkinHistory = response;
          // 一部チェックインデータ欠損？
          // 例：2019年1月4日15：31にチェックインしたべニューデータがnull
          this.generateEvents(this.checkinHistory.response.checkins.items.filter(x => x.venue != null));
          this.blockUI.stop();
        }
      );
    });
  }

  /** フィルター */
  filterPhotoCheckins() {
    this.calendarEvents = this.utilService.filterHasPhotoCheckin((this.checkinHistory.response.checkins.items.filter(x => x.venue != null)));
  }
  filterMayorCheckins(){
    this.calendarEvents = this.utilService.filterHasMayorCheckin((this.checkinHistory.response.checkins.items.filter(x => x.venue != null)));
  }

  /** 日付操作 */
  onLastYear() {
    this.calendarApi.gotoDate(this.momentApi.subtract(1, 'years').toDate());
    this.router.navigateByUrl(`top/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}`);
  }
  onLastYearMonth(){
    this.momentApi = moment();
    this.calendarApi.gotoDate(this.momentApi.subtract(1, 'years').toDate());
    this.router.navigateByUrl(`top/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}`); 
  }
  onThisMonth() {
    this.calendarApi.today();
    this.momentApi = moment();
    this.router.navigateByUrl(`top/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}`);
  }
  onPrevMonth() {
    this.calendarApi.prev();
    this.momentApi.subtract(1, 'months');
    this.router.navigateByUrl(`top/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}`);
  }
  onNextMonth() {
    this.calendarApi.next();
    this.momentApi.add(1, 'months');
    this.router.navigateByUrl(`top/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}`);
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
