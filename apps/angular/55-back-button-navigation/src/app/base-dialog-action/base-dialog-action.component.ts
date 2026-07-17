import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogBackHandler } from '../interfaces/dialog-back-handler.interface';

@Component({ template: '' })
export abstract class BaseDialogActionComponent implements DialogBackHandler {
  protected readonly dialog = inject(MatDialog);

  protected dialogRef: MatDialogRef<any> | null = null;

  protected abstract openDialogComponent(): void;

  openDialog(): void {
    this.openDialogComponent();
  }

  abstract handleBackNavigation(): Observable<boolean>;
}
