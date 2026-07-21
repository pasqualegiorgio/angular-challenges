import { Directive, effect, inject, input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'tr[currency]',
  providers: [CurrencyService],
})
export class CurrencyDirective {
  currencyService = inject(CurrencyService);
  currencyCode = input.required<string>();

  constructor() {
    effect(() => {
      const code = this.currencyCode();
      this.currencyService.setState({ code });
    });
  }
}
