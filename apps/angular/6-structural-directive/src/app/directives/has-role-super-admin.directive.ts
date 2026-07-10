import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleSuperAdminDirective {
  private readonly userStore = inject(UserStore);

  @Input() set hasRoleSuperAdmin(role: boolean) {
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

    if (user?.isAdmin === true) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
