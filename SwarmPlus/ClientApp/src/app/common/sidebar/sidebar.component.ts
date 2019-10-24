import { SearchConditions } from './../../../assets/SearchConditions';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter();
  searchConditons = new SearchConditions();

  constructor() { }

  ngOnInit() {}

  /** 画面幅が1024px以上ならアコーディオン展開 */
  get showAttrebute (): string{
    return window.innerWidth > 992 ? 'show' : ''
  }

  search() {
    this.event.emit(
      this.searchConditons.traficList.filter(x => x.selected)
        .concat(this.searchConditons.checkinStatusList.filter(x => x.selected))
        .concat(this.searchConditons.restaurantList.filter(x => x.selected))
        .concat(this.searchConditons.shopList.filter(x => x.selected))
      );
  }
}
