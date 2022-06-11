import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyParam'
})
export class EmptyParamPipe implements PipeTransform {
  // this pipe is responsible for replacing any empty element in the dom by the sent string in order to
  // handle any empty values in the product list
  transform(value: string , sentValue:string): string {
    if(value == null)
    {
      value = sentValue;
    }
    return value;
    
  }

}
