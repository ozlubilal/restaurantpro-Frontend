import { Pipe, PipeTransform } from '@angular/core';
import { Table } from '../models/table';

@Pipe({
  name: 'tableStatus'
})
export class TableStatusPipe implements PipeTransform {

  transform(value: Table[], tableStatusId: number): Table[] {
    return tableStatusId?value
    .filter((t:Table)=>t.tableStatusId==tableStatusId):value
  }}





