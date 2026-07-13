import { Directive, Input } from '@angular/core';
import { type Role, User } from '../user.model';
import { RoleBaseDirective } from './role-base.directive';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective extends RoleBaseDirective {
  private requireRole: Role | Role[] | null = null;

  @Input() set appHasRole(role: Role | Role[]) {
    this.requireRole = role;
    this.updateView();
  }

  protected isVisible(user: User | undefined): boolean {
    if (!this.requireRole || !user) return false;

    const rolesToCheck = Array.isArray(this.requireRole)
      ? this.requireRole
      : [this.requireRole];

    return (
      user.isAdmin || user?.roles.some((role) => rolesToCheck.includes(role))
    );
  }
}
