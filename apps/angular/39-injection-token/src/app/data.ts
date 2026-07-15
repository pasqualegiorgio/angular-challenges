import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = new InjectionToken<number>('DEFAULT_TIMER', {
  providedIn: 'root',
  factory: () => 1000,
});
