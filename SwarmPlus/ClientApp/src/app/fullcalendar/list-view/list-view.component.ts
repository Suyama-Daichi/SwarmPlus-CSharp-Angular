import { CheckinDetailComponent } from './../../common/checkin-detail/checkin-detail.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { UtilService } from '../../service/util.service';
import { CalendarEvent } from '../../model/calendarEvent.type';
import { HttpService } from '../../service/http.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, AfterViewInit {
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** カレンダーイベントオブジェクト */
  calendarEvents: CalendarEvent[] = [new CalendarEvent];
  selectedDate = new Date();
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  @ViewChild('calendar') calenderComponent: FullCalendarComponent;
  calendarApi: Calendar;

  checkinId: string;

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) { }

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
      this.httpService.getUserCheckins(this.afterBeforeTimestamp.afterTimestamp, this.afterBeforeTimestamp.beforeTimestamp).subscribe(
        response => {
          this.calendarEvents = this.utilService.generateEvents(response.checkins.items);
          this.calendarApi.gotoDate(this.selectedDate);
          this.blockUI.stop();
        }
      );
    });
  }

  /**
   * モーダルを開く
   * @param checkinDetail モーダル
   */
  openModal(e) {
    const modalRef = this.modalService.open(CheckinDetailComponent);
    modalRef.componentInstance.checkinId = e['event']['_def']['extendedProps']['checkinData'].id;
  }
  /** 日付操作 */
  onLastYear() {
    this.utilService.onLastYear();
  }
  onLastYearMonth() {
    this.utilService.onLastYear();
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
}
