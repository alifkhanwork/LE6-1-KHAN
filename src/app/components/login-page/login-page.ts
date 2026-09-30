import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { TokenStorage } from '../../services/token-storage';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  constructor(
    private authService: Auth,
    private tokenStorage: TokenStorage,
    private router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl || '/']);
    }
  }

  onSubmit() {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (token: string) => {
        this.tokenStorage.saveToken(token);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/']);
      },
      error: () => alert('Invalid credentials'),
    });
  }
}