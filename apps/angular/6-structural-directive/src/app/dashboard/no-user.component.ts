import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-no-user-dashboard',
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>no user selected</p>
    <button app-button routerLink="/">Back to login</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoUserDashboardComponent {}
