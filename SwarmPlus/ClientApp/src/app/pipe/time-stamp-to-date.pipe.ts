import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStampToDate'
})
export class TimeStampToDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): Date {
    return new Date(value * 1000);
  }

}
