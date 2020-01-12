import { Component, OnInit, Input } from '@angular/core';
import moment = require('moment');
import { FlatpickrOptions } from 'ng2-flatpickr';
import Japanese from 'flatpickr/dist/l10n/ja.js';
import { Router } from '@angular/router';
import { Threshold } from '../../const';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {

  _selectedDate: Date;

  @Input() set selectedDate(value: Date) {
    value.setDate(value.getDate() - 1);
    this._selectedDate = value;
  }
  /** Momentのインスタンス */
  momentApi: moment.Moment;

  date: Date[] = [new Date()];
  // datepickerの設定
  options: FlatpickrOptions = {
    locale: Japanese.ja,
    altInput: true,
    altFormat: 'Y/m/',
    altInputClass: 'custom-input',
    maxDate: new Date(),
    defaultDate: new Date(),
  };

  constructor(private router: Router) {
    this.options.defaultDate = !this.router.url.match(Threshold.DATE_REG_EXPRESSION) ? new Date() : new Date(this.router.url.match(Threshold.DATE_REG_EXPRESSION)[0]);
  }

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
