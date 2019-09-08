import { UtilService } from './../../service/util.service';
import { HttpService } from './../../service/http.service';
import { CalendarEvent } from './../../model/calendarEvent.type';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** 選択された日付 */
  selectedDate: string;
  /** カレンダーイベントオブジェクト */
  @Input() calendarEvents: CalendarEvent[] = [];
  @Input() activeMonthView: boolean = false;

  constructor(private httpService: HttpService, private utilService: UtilService, private activatedRoute: ActivatedRoute, private router: Router) { }
  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() { 
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.selectedDate = params.get('date');
    });
  }

  /**
   * 初期データ取得
   * @param e 表示されている日付
   */
  getCheckinsPerDate(e) {
    const t: string = e['view']['title'];
    const afterDate: Date = new Date(t.replace(/[年月日]/gu, '/'));
    const afterTimestamp = afterDate.getTime().toString().substring(0, 10);
    afterDate.setHours(23);
    afterDate.setMinutes(59);
    afterDate.setSeconds(59);
    const beforeTimestamp: string = afterDate.getTime().toString().substring(0, 10);
    this.blockUI.start();
    this.httpService.getUserCheckins(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp).subscribe(
      (response: UsersCheckins) => {
        this.calendarEvents = this.utilService.generateEvents(response.response.checkins.items);
        this.blockUI.stop();
      }
    );
  }
}
