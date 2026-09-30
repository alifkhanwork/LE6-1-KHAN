import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenStorage } from './services/token-storage';
import { Auth } from './services/auth';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly tokenStorage = inject(TokenStorage);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  protected readonly title = signal('frontend');
  protected readonly isLoggedIn = this.tokenStorage.isLoggedIn;

  protected logout(): void {
    this.tokenStorage.signOut();
    this.authService.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
