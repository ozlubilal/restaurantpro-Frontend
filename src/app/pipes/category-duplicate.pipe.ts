import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryDuplicate'
})
export class CategoryDuplicatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
