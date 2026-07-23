import { Directive, input } from '@angular/core';
import { ListContext } from './list.interface';

@Directive({
  selector: '[appList]',
})
export class ListDirective<T> {
  list = input<T[]>();

  static ngTemplateContextGuard<T>(
    dir: ListDirective<T>,
    context: unknown,
  ): context is ListContext<T> {
    return true;
  }
}
