import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserData, UserRole } from '../../models';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  
  isRegistering: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  userRole = UserRole;
  hidePassword = true;

  private router = inject(Router);
  userService = inject(UserService)
  private fb = inject(FormBuilder);
  uiService = inject(UiService)

  constructor() {
    // Redirect if already logged in
    if (this.userService.checkIfUserIsLoggedIn()) {
      this.router.navigate(['/calendar']);
    }
  }

  ngOnInit() {
    // Initialize login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Initialize registration form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [UserRole.Student, Validators.required],
      class: [''],
      allowPushMessage: [true]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    const { username, password } = this.loginForm.value;
    
    this.userService.loginMockup(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.uiService.openSnackBar('Login successful', 'Close');
        this.router.navigate(['/calendar']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Login failed. User does not exist or password is incorrect.';
      }
    });
  }

  onRegister() {
    if (this.isRegistering) {
      if (this.registerForm.invalid) {
        this.markFormGroupTouched(this.registerForm);
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      const newUser: UserData = this.registerForm.value;

      this.userService.registerUser(newUser).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isRegistering = false;
          this.uiService.openSnackBar('Registration successful! Please login.', 'Close');
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      // Switch to registration view
      this.isRegistering = true;
      this.errorMessage = '';
    }
  }

  // Helper for form field validation
  hasError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  // To switch back to login from registration form
  cancelRegistration() {
    this.isRegistering = false;
    this.errorMessage = '';
    this.registerForm.reset({
      role: UserRole.Student,
      allowPushMessage: true
    });
  }

  // Mark all controls as touched to trigger validation display
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}