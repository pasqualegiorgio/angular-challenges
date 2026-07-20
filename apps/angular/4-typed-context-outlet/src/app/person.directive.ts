import { Directive } from '@angular/core';
import { PersonContext } from './person.interface';

@Directive({
  selector: '[appPerson]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    context: unknown,
  ): context is PersonContext {
    return true;
  }
}
