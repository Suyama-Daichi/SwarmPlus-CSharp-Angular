import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateJP'
})
export class DateJPPipe implements PipeTransform {

  transform(value: Date, isEnableHour: boolean): any {
    moment.locale('ja');
    return moment(value).format(`YYYY/M/D(ddd) ${isEnableHour ? 'hh:mm' : ''}`);
  }

}
