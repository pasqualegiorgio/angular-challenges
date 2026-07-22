import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { NavigationService } from './navigation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        { path: '', loadComponent: () => import('./blog/blog.component') },
        {
          path: 'post/:id',
          loadComponent: () => import('./post/post.component'),
        },
      ],
      withComponentInputBinding(),
      withViewTransitions(),
    ),
    provideAppInitializer(() => {
      inject(NavigationService);
    }),
  ],
};
