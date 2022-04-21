import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
@Pipe({
  name: 'getAge'
})
export class GetAgePipe implements PipeTransform {

  transform(value: string, ...args: number[]): number {
    const now = moment();
    const birtDate = moment(value);
    return now.diff(birtDate,'years');
  }

}
