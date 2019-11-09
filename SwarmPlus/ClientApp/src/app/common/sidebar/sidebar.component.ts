import { SearchConditions } from './../../../assets/SearchConditions';
import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Japanese from 'flatpickr/dist/l10n/ja.js';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter();
  searchConditons = new SearchConditions();
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  // datepickerの設定
  options: FlatpickrOptions = {
    locale: Japanese.ja,
    maxDate: new Date(),
    defaultDate: new Date(),
    dateFormat: 'Y/m/d(D)'
  }

  date: Date[] = [new Date()];

  constructor(private router: Router) { }

  ngOnInit() { }

  /** 画面幅が1024px以上ならアコーディオン展開 */
  get showAttrebute(): string {
    return window.innerWidth > 992 ? 'show' : ''
  }

  /**
   * 指定された日付の詳細に移動
   */
  pageToDate() {
    this.momentApi = moment(this.date[0]);
    this.router.navigateByUrl(`day/${this.momentApi.format('YYYY')}/${this.momentApi.format('MM')}/${this.momentApi.format('DD')}`)
  }

  search() {
    this.event.emit(
      this.searchConditons.traficList.filter(x => x.selected)
        .concat(this.searchConditons.checkinStatusList.filter(x => x.selected))
        .concat(this.searchConditons.restaurantList.filter(x => x.selected))
        .concat(this.searchConditons.landmarkActivity.filter(x => x.selected))
        .concat(this.searchConditons.buildings.filter(x => x.selected))
        .concat(this.searchConditons.shopList.filter(x => x.selected))
    );
  }
}
