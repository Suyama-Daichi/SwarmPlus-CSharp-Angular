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
  @Input() calendarEvent: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }

}
