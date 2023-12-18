import { Pipe, PipeTransform } from '@angular/core';
import { HeadersTable } from '../../../../assets/_data/header-pipe';

@Pipe({
  name: 'changeNameHeader'
})
export class ChangeNameHeaderPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const key = value.split('-')[0];
    return HeadersTable[key] || value;
  }
}
