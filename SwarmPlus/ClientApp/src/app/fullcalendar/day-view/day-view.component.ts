import { CalendarEvent } from './../../model/calendarEvent.type';
import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

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

  /** ヘッダーオプション */
  headerOptions = {
    left:   'title',
    center: '',
    right:  'today prev,next'
  }
  constructor() { }

  ngOnInit() {
    console.log(this.selectedDate);
  }

}
