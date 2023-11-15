import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Product[], filterText: number): Product[] {
    return filterText?value
    .filter((p:Product)=>p.categoryId==filterText)
    :value;
  }

}
