import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseDialogActionComponent } from '../base-dialog-action/base-dialog-action.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent
  extends BaseDialogActionComponent
  implements OnInit, OnDestroy
{
  private readonly router = inject(Router);
  private confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent> | null =
    null;
  private popstateHandler: (() => void) | null = null;
  private confirmationSub: Subscription | null = null;

  ngOnInit(): void {
    this.popstateHandler = () => {
      if (this.confirmationDialogRef) {
        this.confirmationDialogRef.close();
        this.confirmationDialogRef = null;
        history.pushState(null, '');
        return;
      }

      if (this.dialogRef) {
        this.openConfirmation();
        return;
      }
    };
    window.addEventListener('popstate', this.popstateHandler);
  }

  ngOnDestroy(): void {
    if (this.popstateHandler) {
      window.removeEventListener('popstate', this.popstateHandler);
    }
    this.confirmationSub?.unsubscribe();
  }

  protected openDialogComponent(): void {
    history.pushState(null, '');
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      disableClose: true,
    });
  }

  private openConfirmation(): void {
    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    history.pushState(null, '');

    this.confirmationSub?.unsubscribe();
    this.confirmationSub = this.confirmationDialogRef
      .afterClosed()
      .subscribe((confirmed) => {
        this.confirmationDialogRef = null;

        if (confirmed === true) {
          this.dialogRef?.close();
          this.dialogRef = null;
          this.router.navigate(['/home']);
        }
      });
  }

  handleBackNavigation(): Observable<boolean> {
    if (this.confirmationDialogRef) {
      this.confirmationDialogRef.close();
      this.confirmationDialogRef = null;
      return of(false);
    }
    if (this.dialogRef) {
      return of(false);
    }
    return of(true);
  }
}
