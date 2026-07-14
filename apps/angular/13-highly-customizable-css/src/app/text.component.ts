/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  template: `
    <p style="font-size: var(--font); color: var(--color)">
      <ng-content />
    </p>
  `,
  styles: `
    :host {
      --font: 10px;
      --color: black;
    }
    :host-context(static-text[type='error']) {
      --font: 30px;
      --color: red;
    }
    :host-context(static-text[type='warning']) {
      --font: 25px;
      --color: orange;
    }
  `,
})
export class TextComponent {}
