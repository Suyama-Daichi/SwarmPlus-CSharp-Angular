import { SearchConditions } from './../../../assets/SearchConditions';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Japanese from 'flatpickr/dist/l10n/ja.js';
import { Threshold } from '../../const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter();
  searchConditons = new SearchConditions();
  // datepickerの設定
  options: FlatpickrOptions = {
    locale: Japanese.ja,
    maxDate: new Date(),
    defaultDate: new Date(),
    dateFormat: 'Y/m/d(D)'
  };

  constructor() { }

  ngOnInit() { }

  /** 画面幅が992px以上ならアコーディオン展開 */
  get showAttrebute(): string {
    return window.innerWidth > Threshold.TABLET_WIDTH ? 'show' : '';
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
