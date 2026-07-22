import { inject, Injectable, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  readonly selectedPostId = signal<number>(1);
  readonly prevScrollY = signal<number>(0);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        if (location.pathname.includes('post')) {
          const id = Number(location.pathname.split('/')[2]);
          this.selectedPostId.set(id - 1);
        } else {
          const id = Number(event.url.split('/')[2]);
          this.selectedPostId.set(id - 1);
          this.prevScrollY.set(window.scrollY);
        }
      });
  }
}
