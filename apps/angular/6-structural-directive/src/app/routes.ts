import type { Routes } from '@angular/router';
import {
  adminGuard,
  clientGuard,
  everyoneGuard,
  managerGuard,
  noUserGuard,
  writerReaderGuard,
} from './guards';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  // Route for ADMIN role
  {
    path: 'enter',
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  // Route for MANAGER role
  {
    path: 'enter',
    canMatch: [managerGuard],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  // Route for READER and/or WRITER roles
  {
    path: 'enter',
    canMatch: [writerReaderGuard],
    loadComponent: () =>
      import('./dashboard/writer-reader.component').then(
        (m) => m.WriterReaderDashboardComponent,
      ),
  },
  // Route for CLIENT role
  {
    path: 'enter',
    canMatch: [clientGuard],
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
  // Route for EVERYONE role
  {
    path: 'enter',
    canMatch: [everyoneGuard],
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent,
      ),
  },
  // Route fallback for no user
  {
    path: 'enter',
    canMatch: [noUserGuard],
    loadComponent: () =>
      import('./dashboard/no-user.component').then(
        (m) => m.NoUserDashboardComponent,
      ),
  },
];
