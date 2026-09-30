import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  // sessionStorage only exists in the browser; on the server every call is a no-op.
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isLoggedIn = signal(false);

  constructor() {
    this.isLoggedIn.set(!!this.getToken());
  }

  signOut(): void {
    if (this.isBrowser) {
      window.sessionStorage.clear();
    }
    this.isLoggedIn.set(false);
  }

  public saveToken(token: string): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
    this.isLoggedIn.set(true);
  }

  public getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(id: number): void {
    if (!this.isBrowser) {
      return;
    }
    let strId = id.toString();
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, strId);
  }
}
