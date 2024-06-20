import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFromGoogle'
})
export class GooglePipe implements PipeTransform {

  transform(fromGoogle: boolean): string {
    return fromGoogle ? 'Google' : 'Email';
  }

}
