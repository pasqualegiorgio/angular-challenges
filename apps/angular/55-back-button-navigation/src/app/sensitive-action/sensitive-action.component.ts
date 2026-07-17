import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogBackHandler } from '../interfaces/dialog-back-handler.interface';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements DialogBackHandler {
  private readonly dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<unknown> | null = null;
  private confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent> | null =
    null;

  protected openDialog(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  canLeaveIfDialogOpen(): Observable<boolean> {
    if (!this.dialogRef && !this.confirmationDialogRef) return of(true);

    if (this.confirmationDialogRef) {
      this.confirmationDialogRef.close();
      this.confirmationDialogRef = null;
      return of(false);
    }

    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: false,
    });

    return this.confirmationDialogRef.afterClosed().pipe(
      map((confirmed: boolean | undefined) => {
        this.confirmationDialogRef = null;

        if (confirmed) {
          this.dialogRef?.close();
          this.dialogRef = null;
          return true;
        }

        return false;
      }),
    );
  }
}
