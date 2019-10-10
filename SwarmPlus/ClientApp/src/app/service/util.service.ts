import { Injectable } from '@angular/core';
import { AfterBeforeTimestamp } from '../model/AfterBeforeTimestamp.type';
import { CalendarEvent } from '../model/calendarEvent.type';
import { SelectedCategory } from '../model/selectedCategory.type';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  /**
   * 月初と月末を取得
   * 参考： https://qiita.com/su_mi/items/2f086817a4dd0b05f304
   */
  getFirstDateAndLastDateOfThisMonth(year: number, month: number): AfterBeforeTimestamp {
    let afterBeforeTimestamp = new AfterBeforeTimestamp();
    const nowDateTime = new Date(year, month);
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
   * @param date 日時
   */
  getTimestamp(date: Date): AfterBeforeTimestamp {
    let afterBeforeTimestamp = new AfterBeforeTimestamp();
    date.setHours(0, 0, 0);
    afterBeforeTimestamp.afterTimestamp = (date.getTime()).toString().substring(0, 10);
    afterBeforeTimestamp.beforeTimestamp = date.setDate(date.getDate() + 1).toString().substring(0, 10);
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
        return ({ id: i + 1, title: (x.isMayor ? '👑' : '') + (x.photos.count > 0 ? '📷' : '') + x.venue.name, date: new Date(x.createdAt * 1000), checkinData: x });
      }
    );
  }

  /** チェックインを絞り込み */
  filterCheckin(checkinItems: Item4[], selectedCategories: string[]): CalendarEvent[] {
    console.log(checkinItems);
    return checkinItems.filter(f =>
      f.venue.categories.some(s => selectedCategories.length === 0 || selectedCategories.includes(s.id))
    ).map((x, i) => {
      return (
        {
          id: i + 1,
          title: (x.isMayor ? '👑' : '') + (x.photos.count > 0 ? '📷' : '') + x.venue.name, date: new Date(x.createdAt * 1000),
          checkinData: x
        });
    });
  }
}
