import { Injectable } from '@angular/core';
import { AfterBeforeTimestamp } from '../model/AfterBeforeTimestamp.type';

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
    afterBeforeTimestamp.afterTimestamp = nowDateTime.setHours(0,0,0).toString().substring(0, 10);
    return afterBeforeTimestamp;
  }
}
