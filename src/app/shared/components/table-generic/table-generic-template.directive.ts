import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pTemplate]',
  host: {
  }
})
export class TableGenericTemplate {

  @Input() type: string;

  @Input('pTemplate') name: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    return this.name;
  }
}

