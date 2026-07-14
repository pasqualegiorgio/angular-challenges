/* eslint-disable @angular-eslint/directive-selector */
import {
  ButtonState,
  DECOUPLING_CORE,
} from '@angular-challenges/decoupling/core';
import { Directive, inject, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    {
      provide: DECOUPLING_CORE,
      useFactory: () => inject(BtnDisabledDirective).state,
    },
  ],
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
