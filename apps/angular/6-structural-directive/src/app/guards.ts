import { inject } from '@angular/core';
import { UserStore } from './user.store';

export const adminGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return user?.isAdmin === true;
};

export const managerGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return user ? user?.roles.includes('MANAGER') : false;
};

export const writerReaderGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return user
    ? user?.roles.includes('WRITER') || user?.roles.includes('READER')
    : false;
};

export const clientGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return user ? user?.roles.includes('CLIENT') : false;
};

export const everyoneGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return user ? user?.roles.length === 0 && user?.isAdmin === false : false;
};

export const noUserGuard = () => {
  const userStore = inject(UserStore);
  const user = userStore.getCurrentUser();
  return !user;
};
