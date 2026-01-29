import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/authservice';
import { LoginRequest } from '../models/LoginRequest';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./signin.css']
})
export class signin implements OnInit {
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  showShake: boolean = false;
  emailFocused: boolean = false;
  passwordFocused: boolean = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check for remembered credentials if needed
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginRequest.email = rememberedEmail;
      this.rememberMe = true;
    }
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(form: NgForm): void {
    if (form.invalid) {
      this.triggerShake();
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        // Store user info in localStorage or a service
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('userEmail', response.email);
        if (response.name) {
          localStorage.setItem('userName', response.name);
        }
        this.router.navigate(['/userint']);
      },
      error: (error) => {
        this.isLoading = false;
        this.triggerShake();

        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please check your connection.';
        } else {
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
      }
    });
  }



  private triggerShake(): void {
    this.showShake = true;
    setTimeout(() => {
      this.showShake = false;
    }, 500);
  }
}
