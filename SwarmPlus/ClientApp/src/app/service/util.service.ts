import { SelectedCategory } from './../model/selectedCategory.type';
import { Injectable } from '@angular/core';
import { AfterBeforeTimestamp } from '../model/AfterBeforeTimestamp.type';
import { CalendarEvent } from '../model/calendarEvent.type';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  /**
   * 月初と月末を取得
   * 参考： https://qiita.com/su_mi/items/2f086817a4dd0b05f304
   * Todo: もう少しスマートに書き直したい
   */
  getFirstDateAndLastDateOfThisMonth(year: number, month: number): AfterBeforeTimestamp {
    let afterBeforeTimestamp = new AfterBeforeTimestamp();
    const nowDateTime = new Date(year, month);
    // 月末を取得
    nowDateTime.setMonth(nowDateTime.getMonth() + 1);
    nowDateTime.setHours(23, 59, 59);
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
  generateEvents(checkinItems: Item4[]): CalendarEvent[] {
    // 一部チェックインデータ欠損？
    // 例：2019年1月4日15：31にチェックインしたべニューデータがnull
    return checkinItems.filter(x => x.venue != null).
      map(
        (x: Item4, i) => {
          return this.calendarTitleGenerator(x, i);
        }
      );
  }

  /**
   * チェックインを絞り込み
   * @param checkinItems 絞り込み対象のチェックインデータ群
   * @param searchCondition 検索条件
   */
  filterCheckin(checkinItems: Item4[], searchCondition: SelectedCategory[]): CalendarEvent[] {
    let statusList = !searchCondition === true ? [] : searchCondition.filter(f => !f.isCategory).map(m => m.key);
    let categoryList = !searchCondition === true ? [] : searchCondition.filter(f => f.isCategory).map(m => m.key);

    return checkinItems.filter((f, i) =>
      f.venue != null
      && (statusList.length === 0 ? true : statusList.some(s => s === 'isMayor') ? f.isMayor : true)
      && (statusList.length === 0 ? true : statusList.some(s => s === 'photos') ? f.photos.count > 0 : true)
      && (statusList.length === 0 ? true : statusList.some(s => s === 'with') ? f.with : true)
      && (categoryList.length === 0 ? true : f.venue.categories.some(s => categoryList.some(ss => ss.includes(s.id))))
    ).map((x, i) => {
      return this.calendarTitleGenerator(x, i);
    });
  }

  /**
   * カレンダーのタイトルに表示する文字列を生成
   * @param checkinData チェックインデータ
   */
  calendarTitleGenerator(checkinData: Item4, index: number): CalendarEvent {
    return (
      {
        id: index + 1,
        title: `${checkinData.isMayor ? '👑' : ''} ${checkinData.photos.count > 0 ? '📷' : ''} ${checkinData.with !== null ? '👯' : ''} ${checkinData.venue.name} ${checkinData.with !== null ? `with ${checkinData.with.map(m => m.firstName).join(', ')}` : ''}`,
        date: new Date(checkinData.createdAt * 1000),
        checkinData: checkinData
      }
    )
  }
}
