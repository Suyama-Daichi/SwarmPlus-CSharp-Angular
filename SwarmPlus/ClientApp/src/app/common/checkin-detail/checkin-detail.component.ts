import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.scss']
})
export class CheckinDetailComponent implements OnInit {
  /** 取得対象のチェックインID */
  @Input() checkinId: string;
  /** チェックイン詳細データ */
  checkinData: Item4;
  /** べニューの写真(Publicなもの) */
  venuePhotosUrl: Photos

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('checkinDetail', { static: true }) checkinDetailArea: ElementRef;

  constructor(private httpService: HttpService) { }

  /** 値の変更を検知
   *  https://angular.jp/guide/lifecycle-hooks#onchanges
   */
  ngOnChanges(changes: SimpleChanges) {
    this.blockUI.start();
    this.httpService.getCheckinDetail(this.checkinId).subscribe(s => {
      this.httpService.getVenuePhotos(s.venue.id).subscribe(photo => {
        this.venuePhotosUrl = photo;
        this.checkinData = s;
        this.checkinData.shout = this.checkinData.shout.replace(/— .+と一緒に$/g, '')
        console.log(s)
        this.checkinDetailArea.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
        this.blockUI.stop();
      });
    })
  }
  ngOnInit() { }
}
