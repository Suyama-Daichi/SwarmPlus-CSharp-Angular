import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { UtilService } from '../../service/util.service';
import { CalendarEvent } from '../../model/calendarEvent.type';
import { HttpService } from '../../service/http.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import * as moment from 'moment';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** カレンダーイベントオブジェクト */
  calendarEvents: CalendarEvent[] = [];
  selectedDate = new Date();
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getUserCheckins();
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
          this.calendarEvents = this.utilService.generateEvents(response.response.checkins.items);
          console.log(this.calendarEvents);
          this.blockUI.stop();
        }
      );
    });
  }
}
