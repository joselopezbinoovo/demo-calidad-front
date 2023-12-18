import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetResource'
})
export class AssetResourcePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return `./assets/${args.length > 1 ? args[1] : ''}${value}${args[0]}`;
  }
}
