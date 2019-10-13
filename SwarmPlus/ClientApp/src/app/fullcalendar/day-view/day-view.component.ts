import { AfterBeforeTimestamp } from './../../model/AfterBeforeTimestamp.type';
import { UtilService } from './../../service/util.service';
import { HttpService } from './../../service/http.service';
import { CalendarEvent } from './../../model/calendarEvent.type';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** 選択された日付 */
  selectedDate: Date;
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  /** 詳細コンポーネントが開かれているか */
  isDetailOpen: boolean;
  /** カレンダーのインスタンス */
  @ViewChild('calendar', { static: false }) calenderComponent: FullCalendarComponent;
  calendarApi: Calendar;
  /** 詳細表示するチェックインデータ */
  checkinData: Item4;
  /** カレンダーイベントオブジェクト */
  @Input() calendarEvents: CalendarEvent[] = [];

  constructor(private httpService: HttpService, private utilService: UtilService, private activatedRoute: ActivatedRoute, private router: Router) { }
  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getCheckinsPerDate();
  }
  ngAfterViewInit() {
    this.calendarApi = this.calenderComponent.getApi();
  }
  /**
   * チェックインデータ取得
   */
  getCheckinsPerDate() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const y = params.get('year'), m = params.get('month'), d = params.get('date');
      this.momentApi = moment(y === null || m === null || d === null || !y.match(/19[0-9]{2}|20[0-9]{2}/g) || !m.match(/[1-9]|1[0-2]/g) || !d.match(/[1-9]|[12][0-9]|3[01]/g) ? new Date() : `${y}-${m}-${d}`);
      this.selectedDate = this.momentApi.toDate();
      const afterBeforeTimestamp: AfterBeforeTimestamp = this.utilService.getTimestamp(this.selectedDate);
      this.blockUI.start();
      this.httpService.getUserCheckins(afterBeforeTimestamp.afterTimestamp, afterBeforeTimestamp.beforeTimestamp).subscribe(
        (response: UsersCheckins) => {
          this.calendarEvents = this.utilService.generateEvents(response.response.checkins.items.filter(x => x.venue != null));
          this.blockUI.stop();
        }
      );
    });
  }

  /** フィルター */
  filterCheckins(e: string[]) {
    this.calendarEvents = this.utilService.filterCheckin(([this.checkinData]), e);
  }

  /** 日付操作 */
  onLastYear() {
    this.calendarApi.gotoDate(this.momentApi.subtract(1, 'years').toDate());
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
    this.isDetailOpen = false;
  }
  onLastYearToday() {
    this.momentApi = moment();
    this.calendarApi.gotoDate(this.momentApi.subtract(1, 'years').toDate());
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
    this.isDetailOpen = false;
  }
  onToday() {
    this.calendarApi.today();
    this.momentApi = moment();
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
    this.isDetailOpen = false;
  }
  onPrevDate() {
    this.calendarApi.prev();
    this.momentApi.subtract(1, 'days');
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
    this.isDetailOpen = false;
  }
  onNextDate() {
    this.calendarApi.next();
    this.momentApi.add(1, 'days');
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
    this.isDetailOpen = false;
  }

  /**
   * 詳細表示する
   */
  openDetail(e) {
    this.isDetailOpen = true;
    this.checkinData = e['event']['_def']['extendedProps']['checkinData'].id;
  }
  /** サイドバーから検索条件を受けとる */
  catchSearchCondition(e: string[]) {
    // 二次元配列を一次元配列に変換
    this.filterCheckins(Array.prototype.concat.apply([], e));
  }
}
