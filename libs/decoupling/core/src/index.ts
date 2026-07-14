import { InjectionToken, WritableSignal } from '@angular/core';

export const DECOUPLING_CORE = new InjectionToken<WritableSignal<ButtonState>>(
  'DECOUPLING_CORE',
);

export type ButtonState = 'enabled' | 'disabled';
