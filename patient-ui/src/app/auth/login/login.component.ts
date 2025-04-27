import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'amatis-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private toaster: ToastrService) { }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
        if (res.isSuccess && res.data) {
          this.storageService.Set("token", res.data.token);
          this.storageService.Set("user", res.data.user);
          this.router.navigate(['/home/patients']);
        } else {
          this.toaster.error("Login failed", res.message); 
        }
      });
    }
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
