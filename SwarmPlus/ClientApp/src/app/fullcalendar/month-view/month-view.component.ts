import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UtilService } from '../../service/util.service';
import { AfterBeforeTimestamp } from '../../model/AfterBeforeTimestamp.type';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  /** ユーザーのチェックイン履歴 */
  checkinHistory: UsersCheckins;
  /** 初月と月末のタイムスタンプインスタンス */
  afterBeforeTimestamp: AfterBeforeTimestamp;
  /** FullCalenderライブラリのインポート */
  calendarPlugins = [interactionPlugin, dayGridPlugin, listPlugin];
  @Input() calendarEvents;
  constructor(private httpService: HttpService, private utilService: UtilService) { }


  ngOnInit() {
    this.afterBeforeTimestamp = this.utilService.getFirstDateAndLastDateOfThisMonth();
  }

    /**
   * 日付を押下したときに発火される
   * https://stackoverflow.com/questions/56261140/dateclick-not-emitted-in-fullcalendar-angular
   * @param event 日付のクリックイベント
   */
  calenderClick(event) {
    console.log(event);
    let afterBeforeTimestamp = this.utilService.getTimestamp(event.dateStr);
    // 未来のチェックインは取得しない
    if (Number(afterBeforeTimestamp.afterTimestamp) <= Number(new Date().getTime().toString().substring(0, 10))) {
      this.getCheckins(afterBeforeTimestamp.afterTimestamp, afterBeforeTimestamp.beforeTimestamp);
    }
    console.log(afterBeforeTimestamp);
  }

    /**
   * 特定期間のチェックインを取得する
   * @param afterTimestamp 取得する期間(始まり)
   * @param beforeTimestamp 取得する期間(終わり)
   */
  getCheckins(afterTimestamp: string = '1500218379', beforeTimestamp: string = '1502896779') {
    this.httpService.getCheckinsPerMonth(localStorage.getItem('uuid'), afterTimestamp, beforeTimestamp).subscribe(
      response => {
        this.checkinHistory = response;
        console.log(this.checkinHistory.response.checkins)
      }
    );
  }

}
