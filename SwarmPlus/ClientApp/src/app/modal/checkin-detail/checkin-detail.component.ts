import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
/** 
 * モーダルコンポーネント
 * 参考：https://dev.classmethod.jp/etc/angular6-ngx-simple-modal/
 */
export class CheckinDetailComponent extends SimpleModalComponent<Item4, boolean> implements Item4{
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
  constructor() {
    super();
  }
}
