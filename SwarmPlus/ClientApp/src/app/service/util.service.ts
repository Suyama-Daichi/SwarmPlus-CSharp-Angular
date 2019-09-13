import { Injectable } from '@angular/core';
import { AfterBeforeTimestamp } from '../model/AfterBeforeTimestamp.type';
import { CalendarEvent } from '../model/calendarEvent.type';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  /**
   * 今月の月初と月末を取得
   * 参考： https://qiita.com/su_mi/items/2f086817a4dd0b05f304
   */
  getFirstDateAndLastDateOfThisMonth(): AfterBeforeTimestamp {
    let afterBeforeTimestamp = new AfterBeforeTimestamp();
    const nowDateTime = new Date();
    // 月末を取得
    nowDateTime.setMonth(nowDateTime.getMonth() + 1)
    afterBeforeTimestamp.beforeTimestamp = nowDateTime.setDate(0).toString().substring(0, 10);
    // 月初を取得
    nowDateTime.setDate(1)
    // 月初においては、実行された時刻以前のデータが取れないため時刻を0時にしておく
    afterBeforeTimestamp.afterTimestamp = nowDateTime.setHours(0, 0, 0).toString().substring(0, 10);
    return afterBeforeTimestamp;
  }

  /**
   * 特定の日付のタイムスタンプを取得する
   * @param dateString 日時文字列
   */
  getTimestamp(dateString: string): AfterBeforeTimestamp {
    let afterBeforeTimestamp = new AfterBeforeTimestamp();
    const clickedDate = new Date(dateString);
    clickedDate.setHours(0, 0, 0);
    afterBeforeTimestamp.afterTimestamp = (clickedDate.getTime()).toString().substring(0, 10);
    afterBeforeTimestamp.beforeTimestamp = clickedDate.setDate(clickedDate.getDate() + 1).toString().substring(0, 10);
    return afterBeforeTimestamp;
  }

  /**
   * タイムスタンプを"2019-08-01"の形式に変換
   * @param timestamp タイムスタンプ(10桁)
   */
  getDateStringFromTimestamp(timestamp: number = new Date().getTime()) {
    const parsedDate: Date = new Date(timestamp * 1000);
    const dateString = parsedDate.getFullYear() + '-' + ("0" + (parsedDate.getMonth() + 1)).slice(-2) + '-' + ("0" + parsedDate.getDate()).slice(-2);
    return dateString;
  }

  /** イベントデータを生成 */
  generateEvents(chackinItems: Item4[]): CalendarEvent[] {
    return chackinItems.map(
      (x: Item4, i) => {
        return ({ id: i + 1, title: (x.isMayor ? '👑' : '') + (x.photos.count > 0 ? '📷' : '') + x.venue.name, date: new Date(x.createdAt * 1000), checkinData: x});
      }
    );
  }
}
