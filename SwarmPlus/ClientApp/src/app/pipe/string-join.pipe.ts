import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoin'
})
export class StringJoinPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // Todo: any型を排除したい
    if (value.count) {
      return value.count >= 5 ? `${value.items.map(m => m.firstName).join(',')} とその他 ${value.count - value.items.length}人` : value.items.map(m => m.firstName).join(',');
    } else {
    }
    return value.map(m => m.firstName).join(',');
  }

}
