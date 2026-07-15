import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DEFAULT_TIMER } from './data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'video' },
      { path: 'video', loadComponent: () => import('./video.component') },
      {
        path: 'phone',
        loadComponent: () => import('./phone.component'),
        providers: [{ provide: DEFAULT_TIMER, useValue: 2000 }],
      },
    ]),
  ],
};
