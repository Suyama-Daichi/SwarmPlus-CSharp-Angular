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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckinDetailComponent } from '../../common/checkin-detail/checkin-detail.component';
import { UsersCheckins } from '../../model/UserCheckins.type';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, AfterViewInit {
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** カレンダーイベントオブジェクト */
  calendarEvents: CalendarEvent[] = [];
  /** 表示対象の年月日 */
  selectedDate: Date;
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** 詳細表示するチェックインデータ */
  checkinId: string;
  /** 今日の日付(未来の日付を選択させないため) */
  nowDate = { end: new Date() };
  /** カレンダーのインスタンス */
  @ViewChild('calendar') calenderComponent: FullCalendarComponent;
  calendarApi: Calendar;
  /** サイドバーコンポーネントから受け取った絞り込み条件を保持 */
  searchCondition: SelectedCategory[];
  constructor(
    private httpService: HttpService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal

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
      this.momentApi = moment(y === null || m === null || !y.match(/20[0-9]{2}/g) || !m.match(/[1-9]|1[0-2]/g) ? new Date() : new Date(`${y}-${m}`));
      this.selectedDate = this.momentApi.toDate();
      this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth(this.selectedDate);
      this.blockUI.start();
      this.httpService.getUserCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.checkinHistory = response;
          this.calendarEvents = this.utilService.generateEvents(this.checkinHistory.checkins.items);
          this.filterCheckins(this.searchCondition);
          this.calendarApi.gotoDate(this.selectedDate);
          this.blockUI.stop();
        }
      );
    });
  }

  /**
   * モーダルを開く
   * @param checkinDetail モーダルコンポーネント
   * @param e イベントオブジェクト
   */
  openModal(e) {
    const modalRef = this.modalService.open(CheckinDetailComponent);
    modalRef.componentInstance.checkinId = this.checkinId = e['event']['_def']['extendedProps']['checkinData'].id;
  }

  /** フィルター */
  filterCheckins(e: SelectedCategory[]) {
    this.calendarEvents = this.utilService.filterCheckin((this.checkinHistory.checkins.items), e);
  }

  /** 日付操作 */
  onLastYear() {
    this.utilService.onLastYear();
  }
  onLastYearMonth() {
    this.utilService.onLastYearMonth();
  }
  onThisMonth() {
    this.utilService.onThisMonth();
  }
  onPrevMonth() {
    this.utilService.onPrevMonth();
  }
  onNextMonth() {
    this.utilService.onNextMonth();
  }

  /**
   * 日付を押下したときに発火される
   * https://stackoverflow.com/questions/56261140/dateclick-not-emitted-in-fullcalendar-angular
   * @param event 日付のクリックイベント
   */
  onDateClick(event) {
    this.router.navigateByUrl(`day/${event.dateStr.replace(/-/g, '/')}`);
  }

  /** サイドバーから検索条件を受けとる */
  catchSearchCondition(e: SelectedCategory[]) {
    this.searchCondition = e;
    // 二次元配列を一次元配列に変換
    this.filterCheckins(e);
  }

}
