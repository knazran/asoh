import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/**
 * Generated class for the BillionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'billion',
})
export class BillionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
	constructor(private decimalPipe: DecimalPipe) {

	}
  transform(value: any, digits?: any): any {
    return this.decimalPipe.transform(value/1000000000, digits)
  }
}
