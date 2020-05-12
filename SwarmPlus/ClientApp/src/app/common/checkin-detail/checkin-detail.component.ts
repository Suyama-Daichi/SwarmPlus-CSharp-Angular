import { UtilService } from './../../service/util.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Photos, Item4 } from '../../model/UserCheckins.type';

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
  venuePhotosUrl: Photos;
  toTopUrl = this.utilService.nomalizeCurrentUrl();
  defaultImagePath = '../../../assets/image/l_e_others_500.png';

  /** BlockUI */
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('checkinDetail', { static: true }) checkinDetailArea: ElementRef;

  constructor(
    private httpService: HttpService,
    private utilService: UtilService,
    public activeModal: NgbActiveModal
    ) { }

  /**
   * 下部にスクロールする
   */
  onloadImage() {
    this.checkinDetailArea.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  ngOnInit() {
    this.blockUI.start();
    this.httpService.getCheckinDetail(this.checkinId).subscribe(s => {
      this.httpService.getVenuePhotos(s.venue.id).subscribe(photo => {
        this.venuePhotosUrl = photo;
        this.checkinData = s;
        this.checkinData.shout = !this.checkinData.shout ? null : this.checkinData.shout.replace(/— .+と一緒に$/g, '');
        this.blockUI.stop();
      });
    });
  }
}
