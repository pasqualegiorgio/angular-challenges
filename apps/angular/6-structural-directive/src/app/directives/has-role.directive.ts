import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private requireRole: Role | Role[] | null = null;
  private readonly userStore = inject(UserStore);

  @Input() set hasRole(role: Role | Role[]) {
    this.requireRole = role;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
    this.userStore.user$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    const user = this.userStore.getCurrentUser();
    const rolesToCheck = Array.isArray(this.requireRole)
      ? this.requireRole
      : [this.requireRole];
    const hasRole = user?.roles.some((role) => rolesToCheck.includes(role));

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
