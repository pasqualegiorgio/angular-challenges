import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import type { Role } from './user.model';
import { UserStore } from './user.store';

const hasRoleGuard =
  (...roles: Role[]): CanMatchFn =>
  () => {
    const user = inject(UserStore).getCurrentUser();
    return !!user?.roles.some((r) => roles.includes(r));
  };

export const adminGuard: CanMatchFn = () =>
  !!inject(UserStore).getCurrentUser()?.isAdmin;

export const managerGuard = hasRoleGuard('MANAGER');

export const writerReaderGuard = hasRoleGuard('WRITER', 'READER');

export const clientGuard = hasRoleGuard('CLIENT');

export const noUserGuard: CanMatchFn = () =>
  !inject(UserStore).getCurrentUser();

export const everyoneGuard: CanMatchFn = () => {
  const user = inject(UserStore).getCurrentUser();
  return !!user;
};
