import { CanDeactivateFn } from '@angular/router';
import { DialogBackHandler } from '../interfaces/dialog-back-handler.interface';

export const dialogBackDeactivateGuard: CanDeactivateFn<DialogBackHandler> = (
  component,
) => {
  return component.handleBackNavigation();
};
