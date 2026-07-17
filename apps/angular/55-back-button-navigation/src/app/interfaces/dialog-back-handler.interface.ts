import { Observable } from 'rxjs';

export interface DialogBackHandler {
  handleBackNavigation(): Observable<boolean>;
}
