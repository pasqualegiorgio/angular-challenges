import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogBackHandler } from '../interfaces/dialog-back-handler.interface';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent implements DialogBackHandler {
  private readonly dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<unknown> | null = null;

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
    if (this.dialogRef) {
      this.dialogRef.close();
      return of(false);
    }
    return of(true);
  }
}
