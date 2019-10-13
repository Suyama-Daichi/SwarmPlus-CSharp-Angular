import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoin'
})
export class StringJoinPipe implements PipeTransform {

  transform(value: Group, ...args: any[]): any {
    return value.count >= 5 ? `${value.items.map(m => m.firstName).join(',')} とその他 ${value.count - value.items.length}人` : value.items.map(m => m.firstName).join(',');
  }

}
