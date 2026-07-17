import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { BaseDialogActionComponent } from '../base-dialog-action/base-dialog-action.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent
  extends BaseDialogActionComponent
  implements OnInit, OnDestroy
{
  private popstateHandler: (() => void) | null = null;

  ngOnInit(): void {
    this.popstateHandler = () => {
      if (this.dialogRef) {
        this.dialogRef.close();
        this.dialogRef = null;
      }
    };
    window.addEventListener('popstate', this.popstateHandler);
  }

  ngOnDestroy(): void {
    if (this.popstateHandler) {
      window.removeEventListener('popstate', this.popstateHandler);
    }
  }

  protected openDialogComponent(): void {
    history.pushState(null, '');
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      disableClose: true,
    });
  }

  handleBackNavigation(): Observable<boolean> {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
      return of(false);
    }
    return of(true);
  }
}
