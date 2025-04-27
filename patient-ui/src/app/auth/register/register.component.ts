import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'amatis-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private toaster: ToastrService) { }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((res) => {
        if (res.isSuccess && res.data) {
          this.storageService.Set("token", res.data.token);
          this.storageService.Set("user", res.data.user);
          this.router.navigate(['/home']);
        } else {
          this.toaster.error("Register Failed", res.message);
        }
      });
    }
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
