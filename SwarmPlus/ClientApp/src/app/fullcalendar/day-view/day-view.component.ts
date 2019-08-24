import { UtilService } from './../../service/util.service';
import { HttpService } from './../../service/http.service';
import { CalendarEvent } from './../../model/calendarEvent.type';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  /** 選択された日付 */
  @Input() selectedDate: string;
  /** カレンダーイベントオブジェクト */
  @Input() calendarEvents: CalendarEvent[] = [];
  @Input() activeMonthView: boolean = false;

  constructor(private httpService: HttpService, private utilService: UtilService) { }
  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() { }
  getCheckinsPerDate(e) {
    const t: string = e['view']['title'];
    const afterDate: Date = new Date(Number(t.substring(0, 4)), Number(t.substr(5, 1)) - 1, Number(t.substr(7, 2)), 0, 0);
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
    console.log(afterDate);
  }
}
