import { SelectedCategory } from './../../model/selectedCategory.type';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter();
  traficList: SelectedCategory[] = [
    { key: ['4bf58dd8d48988d129951735'], name: '鉄道駅', selected: false, isCategory: true },
    { key: ['52f2ab2ebcbc57f1066b8b4f'], name: 'バス停', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d1ed931735'], name: '空港', selected: false, isCategory: true },
    { key: ['56aa371be4b08b9a8d57353e', '4bf58dd8d48988d12d951735'], name: '港', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d1f9931735', '52f2ab2ebcbc57f1066b8b4c'], name: '道路・交差点・トンネル', selected: false, isCategory: true }
  ];

  restaurantList: SelectedCategory[] = [
    { key: ['4d4b7105d754a06374d81259'], name: '飲食店全般', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d145941735'], name: '中華料理店', selected: false, isCategory: true },
    { key: ['55a59bace4b013909087cb24', '4bf58dd8d48988d1d1941735'], name: '麺類店', selected: false, isCategory: true },
    { key: ['55a59bace4b013909087cb2a'], name: 'うどん屋', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d1df931735'], name: '焼肉', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d16d941735'], name: 'カフェ', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d147941735'], name: '定食屋', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d16e941735'], name: 'ファーストフード店', selected: false, isCategory: true },
    { key: ['4bf58dd8d48988d116941735'], name: 'Bar・居酒屋', selected: false, isCategory: true }
  ]

  checkinStatusList: SelectedCategory[] = [
    { key: 'isMayor', name: 'メイヤー', selected: false, isCategory: false },
    { key: 'photos', name: '写真付き', selected: false, isCategory: false },
    { key: 'with', name: '誰かといた', selected: false, isCategory: false }
  ];

  shopList: SelectedCategory[] = [
    { key: ['4d954b0ea243a5684a65b473'], name: 'コンビニ', selected: false, isCategory: true },
    { key: ['5745c2e4498e11e7bccabdbd'], name: 'ドラッグストア', selected: false, isCategory: true }
  ]

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.event.emit(
      this.traficList.filter(x => x.selected)
        .concat(this.checkinStatusList.filter(x => x.selected))
        .concat(this.restaurantList.filter(x => x.selected))
        .concat(this.shopList.filter(x => x.selected))
        // .map(m => {isCategory})
      );
  }
}
