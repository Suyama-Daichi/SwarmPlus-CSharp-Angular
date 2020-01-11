import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  /** Momentのインスタンス */
  momentApi: moment.Moment;

  date: Date[] = [new Date()];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * 指定された日付の詳細に移動
   */
  pageToDate() {
    this.momentApi = moment(this.date[0]);
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`);
  }

}
