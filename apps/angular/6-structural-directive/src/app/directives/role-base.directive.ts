import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../user.model';
import { UserStore } from '../user.store';

@Directive()
export abstract class RoleBaseDirective {
  protected abstract isVisible(user: User | undefined): boolean;

  private readonly userStore = inject(UserStore);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  protected currentUser: User | undefined;

  constructor() {
    this.userStore.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.currentUser = user;
      this.updateView();
    });
  }

  protected updateView() {
    this.viewContainer.clear();

    if (this.isVisible(this.currentUser)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
