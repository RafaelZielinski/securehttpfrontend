import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ExtractArrayValue' })
export class ExtractArrayValue implements PipeTransform {

  transform(value: any, args: string): any {
    let total: number = 0;
    if (args === 'number'){
      let numberArray: number[] = [];
      if( value > 10 ) {
        for(let i = 0; i < 11; i++) {
          numberArray.push(i);
        }
        return numberArray;
      }
      
      for(let i = 0; i < value; i++) {
        numberArray.push(i);
      }
      return numberArray;
    }

    if (args === 'invoices') {
      value.forEach(invoice => {
        total += invoice.total;
      })

      return total.toFixed(2);
    }
    return 0;
  }

}
