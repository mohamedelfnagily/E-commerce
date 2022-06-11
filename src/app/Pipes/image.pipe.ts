import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string):string {
    if(value == null)
    {
      value =  "../../../assets/images/unknown.jpg";
    }
    return value;
  }

}
