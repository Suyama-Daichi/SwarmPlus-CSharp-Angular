import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
export class CheckinDetailComponent implements OnInit {
  @Input() checkinData: Item4;
  /** べニューの写真(Publicなもの) */
  venuePhotos: Photos;
  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.venuePhotosUrl();
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

  /** べニューの写真を取得 */
  async venuePhotosUrl() {
    this.blockUI.start();
    this.httpService.getVenuePhotos(this.checkinData.venue.id).subscribe(
      result => {
        this.venuePhotos = result;
        this.blockUI.stop()
      }
    );
  }
}
