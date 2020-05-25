import { HttpService } from './http.service';
import { SelectedCategory } from './../model/selectedCategory.type';
import { Injectable } from '@angular/core';
import { AfterBeforeTimestamp } from '../model/AfterBeforeTimestamp.type';
import { CalendarEvent } from '../model/calendarEvent.type';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Calendar } from '@fullcalendar/core';
import { Threshold } from '../const';
import { Item4 } from '../model/UserCheckins.type';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  /** Momentのインスタンス */
  momentApi: moment.Moment;
  constructor(private router: Router, private httpService: HttpService) { }

  /**
   * 月初と月末を取得
   * 参考： https://qiita.com/su_mi/items/2f086817a4dd0b05f304
   * Todo: もう少しスマートに書き直したい
   */
  getFirstDateAndLastDateOfThisMonth(targetDate: Date): AfterBeforeTimestamp {
    const afterBeforeTimestamp = new AfterBeforeTimestamp();
    // 月末を取得
    targetDate.setMonth(targetDate.getMonth() + 1);
    targetDate.setHours(23, 59, 59);
    afterBeforeTimestamp.beforeTimestamp = targetDate.setDate(0).toString().substring(0, 10);
    // 月初を取得
    targetDate.setDate(1);
    // 月初においては、実行された時刻以前のデータが取れないため時刻を0時にしておく
    afterBeforeTimestamp.afterTimestamp = targetDate.setHours(0, 0, 0).toString().substring(0, 10);
    return afterBeforeTimestamp;
  }

  /**
   * 特定の日付のタイムスタンプを取得する
   * @param date 日時
   */
  getTimestamp(date: Date): AfterBeforeTimestamp {
    const afterBeforeTimestamp = new AfterBeforeTimestamp();
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
    const dateString = parsedDate.getFullYear() + '-' + ('0' + (parsedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + parsedDate.getDate()).slice(-2);
    return dateString;
  }

  /** イベントデータを生成 */
  generateEvents(checkinItems: Item4[]): CalendarEvent[] {
    if (checkinItems.length !== 0) {
      // 一部チェックインデータ欠損？
      // 例：2019年1月4日15：31にチェックインしたべニューデータがnull
      return checkinItems.filter(x => x.venue != null).
        map(
          (x: Item4, i) => {
            return this.calendarTitleGenerator(x, i);
          }
        );
    }
  }

  /**
   * チェックインを絞り込み
   * @param checkinItems 絞り込み対象のチェックインデータ群
   * @param searchCondition 検索条件
   */
  filterCheckin(checkinItems: Item4[], searchCondition: SelectedCategory[]): CalendarEvent[] {
    const statusList = !searchCondition === true ? [] : searchCondition.filter(f => !f.isCategory).map(m => m.key);
    const categoryList = !searchCondition === true ? [] : searchCondition.filter(f => f.isCategory).map(m => m.key);

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
        title: `${checkinData.isMayor ? '👑' : ''} ${checkinData.photos.count > 0 ? '📷' : ''} ${checkinData.with ? '👯' : ''} ${checkinData.venue.name} ${checkinData.with ? `with ${checkinData.with.map(m => m.firstName).join(', ')}` : ''}`,
        date: new Date(checkinData.createdAt * 1000),
        checkinData: checkinData
      }
    );
  }

  /**
   * 表示しているページのトップにスクロールする相対URLを生成する
   */
  nomalizeCurrentUrl(): string {
    const currentUrl = this.router.url;
    return currentUrl.indexOf('#') !== -1 ? currentUrl.slice(0, currentUrl.indexOf('#')) + '#top' : currentUrl + '#top';
  }

  /** 日付操作 */
  onLastYear() {
    const currentDisplayDate: moment.Moment = !this.router.url.match(Threshold.MONTH_REG_EXPRESSION) ? moment() : moment(this.router.url.match(Threshold.MONTH_REG_EXPRESSION)[0], 'YYYY/MM');
    currentDisplayDate.subtract(1, 'year');
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onLastYearMonth() {
    const currentDisplayDate: moment.Moment = moment();
    currentDisplayDate.subtract(1, 'year');
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onThisMonth() {
    const currentDisplayDate: moment.Moment = moment();
    this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
  }
  onPrevMonth() {
    const currentDisplayDate: moment.Moment = !this.router.url.match(Threshold.MONTH_REG_EXPRESSION) ? moment() : moment(this.router.url.match(Threshold.MONTH_REG_EXPRESSION)[0], 'YYYY/MM');
    if (currentDisplayDate.isAfter('2009-03', 'month')) {
      currentDisplayDate.subtract(1, 'months');
      this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
    }
  }
  onNextMonth() {
    const currentDisplayDate: moment.Moment = !this.router.url.match(Threshold.MONTH_REG_EXPRESSION) ? moment() : moment(this.router.url.match(Threshold.MONTH_REG_EXPRESSION)[0], 'YYYY/MM');
    if (currentDisplayDate.isBefore(moment(), 'month')) {
      currentDisplayDate.add(1, 'months');
      this.router.navigateByUrl(`month/${currentDisplayDate.format('YYYY')}/${currentDisplayDate.format('MM')}`);
    }
  }
}
