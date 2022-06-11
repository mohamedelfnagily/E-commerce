import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  //this pipe is responsible for replacing the empty image url by default image path.
  transform(value: string):string {
    if(value == null)
    {
      value =  "../../../assets/images/unknown.jpg";
    }
    return value;
  }

}
