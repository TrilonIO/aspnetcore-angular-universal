import { Pipe, PipeTransform } from '@angular/core';
import * as JSON from 'circular-json';

@Pipe({ name: 'circularJson' })
export class CircularJsonPipe implements PipeTransform {

  public transform(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

}
