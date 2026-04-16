import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { MATERIAL_MODULES } from '../../material.providers';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
  ...MATERIAL_MODULES],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  authService = inject(Auth);

  user = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.user());
  currentUser = this.authService.currentUser;
  isAdmin = computed(() => !!this.currentUser()?.admin);
  userName = computed(() => {
    this.user()?.email || '',
      console.log('this.user()', this.user()?.email)
  })
 
  logout() {
    this.authService.logout();
  }
}
