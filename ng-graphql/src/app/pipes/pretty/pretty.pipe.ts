import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretty',
  standalone: true
})
export class PrettyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return '';
    return JSON.stringify(value, undefined, 4)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');
  }

}
