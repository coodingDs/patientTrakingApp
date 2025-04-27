import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'amatis-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private storageService: StorageService, private router: Router) { }

  logout() {
    this.storageService.tokenInfo = null;
    this.storageService.Remove("token");
    this.storageService.Remove("user");
    this.router.navigate(['/auth/login']);
  }
}
