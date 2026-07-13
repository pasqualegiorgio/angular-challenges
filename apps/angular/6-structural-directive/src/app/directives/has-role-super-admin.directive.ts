import { Directive, Input } from '@angular/core';
import { User } from '../user.model';
import { RoleBaseDirective } from './role-base.directive';

@Directive({
  selector: '[appHasRoleSuperAdmin]',
})
export class HasRoleSuperAdminDirective extends RoleBaseDirective {
  private enabled = true;

  @Input() set appHasRoleSuperAdmin(role: boolean) {
    this.enabled = role;
    this.updateView();
  }

  protected isVisible(user: User | undefined): boolean {
    return this.enabled && user?.isAdmin === true;
  }
}
