import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePlus'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, ...args: any[]): Date {
    value.setDate(value.getDate() -1);
    return value;
  }

}
