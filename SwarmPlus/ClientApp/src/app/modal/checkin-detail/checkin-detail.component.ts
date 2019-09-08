import { HttpService } from './../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
/** 
 * モーダルコンポーネント
 * 参考：https://dev.classmethod.jp/etc/angular6-ngx-simple-modal/
 */
export class CheckinDetailComponent extends SimpleModalComponent<Item4, boolean> implements Item4, OnInit {
  createdAt: number;
  type: string;
  entities?: Entity[];
  shout?: string;
  timeZoneOffset: number;
  with?: With[];
  editableUntil: number;
  venue?: Venue;
  likes: Likes;
  like: boolean;
  sticker?: Sticker;
  isMayor: boolean;
  photos: Photos;
  posts: Posts;
  comments: Comments;
  source: Source;
  id: string;

  /** べニューの写真(Publicなもの) */
  venuePhotos: Photos;
  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;

  constructor(private httpService: HttpService) {
    super();
  }

  ngOnInit() {
    this.venuePhotosUrl();
  }

  /** チェックイン日時 */
  get checkinDateTime(): Date {
    return new Date(this.createdAt * 1000);
  }

  /** 一緒にいたユーザ */
  get withWho(): string {
    return this.with.map(x => x.firstName).join(',');
  }

  /** お気に入りしたユーザ */
  get whoFavorite(): string {
    return this.likes.groups[0].items.map(x => x.firstName).join(',');
  }

  /** シャウト文字列の加工 */
  get modifiedShout(): string {
    return this.shout.replace(/— .+と一緒に$/, '');
  }

  /** べニューの写真を取得 */
  async venuePhotosUrl() {
    this.blockUI.start();
    this.httpService.getVenuePhotos(this.venue.id).subscribe(
      result => {
        this.venuePhotos = result;
        this.blockUI.stop()
      }
    );
  }
}
