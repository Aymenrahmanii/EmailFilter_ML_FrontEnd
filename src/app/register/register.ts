import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  user: User = { name: '', email: '', password: '' };
  isLoading = false;
  submitted = false;
  errorMessage = '';
  showPassword = false;
  termsAccepted = false;

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  getPasswordStrengthClass(index: number): string {
    const length = this.user.password.length;
    let baseClass = 'h-1 w-1/4 rounded-full ';

    if (length === 0) return baseClass + 'bg-gray-200';

    if (index === 0) return baseClass + 'bg-red-500';
    if (index === 1) return baseClass + (length >= 5 ? (length >= 8 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-gray-200');
    if (index === 2) return baseClass + (length >= 8 ? 'bg-green-500' : 'bg-gray-200');
    if (index === 3) return baseClass + (length >= 12 ? 'bg-green-500' : 'bg-gray-200');

    return baseClass + 'bg-gray-200';
  }

  register(): void {
    this.submitted = true;

    if (!this.user.name || !this.user.email || this.user.password.length < 8 || !this.termsAccepted) {
      return;
    }

    this.isLoading = true;

    this.userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
