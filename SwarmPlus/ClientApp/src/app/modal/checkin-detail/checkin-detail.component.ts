import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
/** 
 * モーダルコンポーネント
 * 参考：https://dev.classmethod.jp/etc/angular6-ngx-simple-modal/
 */
export class CheckinDetailComponent extends SimpleModalComponent<Item4, boolean> implements Item4 {
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
  constructor(private simpleModalService: SimpleModalService) {
    super();
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
}
