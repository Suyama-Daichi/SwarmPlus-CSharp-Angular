import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
export class CheckinDetailComponent implements OnInit {
  @Input() checkinData: Item4;
  /** べニューの写真(Publicなもの) */
  venuePhotosUrl: Observable<Photos> 
  
  /** 値の変更を検知
   *  https://angular.jp/guide/lifecycle-hooks#onchanges
   */
  ngOnChanges(changes: SimpleChanges){
    this.venuePhotosUrl = this.httpService.getVenuePhotos(changes.checkinData.currentValue.venue.id);
  }

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    console.log(this.checkinData.photos.items)
  }

  /** チェックイン日時 */
  get checkinDateTime(): Date {
    return new Date(this.checkinData.createdAt * 1000);
  }

  /** 一緒にいたユーザ */
  get withWho(): string {
    return this.checkinData.with.map(x => x.firstName).join(',');
  }

  /** お気に入りしたユーザ */
  get whoFavorite(): string {
    return this.checkinData.likes.groups[0].items.map(x => x.firstName).join(',');
  }

  /** シャウト文字列の加工 */
  get modifiedShout(): string {
    return this.checkinData.shout.replace(/— .+と一緒に$/, '');
  }

}
