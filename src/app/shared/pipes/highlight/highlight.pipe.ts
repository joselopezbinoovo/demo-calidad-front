import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  public transform(value: string, search: string): unknown {

    if (!search || !value) {
      return value;
    }

    const re = new RegExp(search, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.toString().replace(re, '<mark>$&</mark>');
  }

}
