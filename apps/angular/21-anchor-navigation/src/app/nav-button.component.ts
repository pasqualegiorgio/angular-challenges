/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  template: `
    <a [routerLink]="linkCommand.path" [fragment]="linkCommand.fragment">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterLink],
})
export class NavButtonComponent {
  href = input<string>('');

  get linkCommand(): { path: string; fragment?: string } {
    return {
      path: this.href().startsWith('/') ? this.href() : '',
      fragment: this.href().startsWith('#')
        ? this.href().replace('#', '')
        : undefined,
    };
  }
}
