import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  };

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form);

    this.http.post('https://localhost:7195/api/login/register', this.form, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.route.navigate(['/login']);
        },
        error: () => alert('Registration failed'),
      });
  }
}