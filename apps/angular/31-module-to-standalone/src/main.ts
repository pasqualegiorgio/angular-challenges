import { appRoutes } from '@angular-challenges/module-to-standalone/shell';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection(), provideRouter(appRoutes)],
}).catch((err) => console.error(err));
