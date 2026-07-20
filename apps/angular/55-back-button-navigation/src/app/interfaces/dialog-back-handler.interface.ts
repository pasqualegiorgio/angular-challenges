import { Observable } from 'rxjs';

export interface DialogBackHandler {
  canLeaveIfDialogOpen(): Observable<boolean>;
}
