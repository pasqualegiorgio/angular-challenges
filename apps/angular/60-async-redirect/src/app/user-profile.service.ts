import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private profile = signal<'admin' | 'user'>('admin');

  setProfile(profile: 'admin' | 'user') {
    this.profile.set(profile);
  }

  getProfile(): 'admin' | 'user' {
    return this.profile();
  }
}
