import { SelectedCategory } from './../../model/selectedCategory.type';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() event = new EventEmitter<string[][]>();
  traficList: SelectedCategory[] = [
    {key: ['4bf58dd8d48988d129951735'], name: '鉄道駅', selected: false},
    {key: ['52f2ab2ebcbc57f1066b8b4f'], name: 'バス停', selected: false},
    {key: ['4bf58dd8d48988d1ed931735'], name: '空港', selected: false},
    {key: ['56aa371be4b08b9a8d57353e','4bf58dd8d48988d12d951735'], name: '港', selected: false},
    {key: ['4bf58dd8d48988d1f9931735','52f2ab2ebcbc57f1066b8b4c'], name: '道路・交差点・トンネル', selected: false}
  ];

  checkinStatusList: SelectedCategory[] = [
    {key: ['mayor'], name: 'メイヤー', selected: false},
    {key: ['photo'], name: '写真付き', selected: false},
    {key: ['with'], name: '誰かといた', selected: false}
  ];

  constructor() { }

  ngOnInit() {
  }

  search(){
    this.event.emit(this.traficList.filter(x => x.selected).concat(this.checkinStatusList.filter(x => x.selected)).map(m => m.key));
  }
}
