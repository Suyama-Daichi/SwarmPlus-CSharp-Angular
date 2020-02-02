import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateJP'
})
export class DateJPPipe implements PipeTransform {

  transform(value: Date | number, isEnableHour: boolean): any {
    moment.locale('ja');
    return moment(typeof value === 'object' ? value : new Date(value * 1000)).format(`YYYY/MM/DD(ddd) ${isEnableHour ? 'hh:mm' : ''}`);
  }

}
