import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'propercase',
    standalone: false
})
export class ProperCasePipe implements PipeTransform {

  transform(value: string, ..._: unknown[]): unknown {
    var inputs = value.split(' ');
    var outputs: string[] = [];

    inputs.forEach(input => {
      outputs.push(input.substring(0, 1).toUpperCase() + input.substring(1, input.length - 1).toLowerCase());
    });

    return inputs.join(' ');
  }

}
