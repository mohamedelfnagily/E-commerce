import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyParam'
})
export class EmptyParamPipe implements PipeTransform {

  transform(value: string , sentValue:string): string {
    if(value == null)
    {
      value = sentValue;
    }
    return value;
    
  }

}
