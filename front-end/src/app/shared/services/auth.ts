import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BROWSER_TOKEN } from '../../core/storage.token';
import { tap } from 'rxjs';
import { IUser } from '../interfaces/user-interface';
import { ILogoutAction, LOGOUT_ACTIONS } from '../interfaces/logout-action.token';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class Auth {
    private http = inject(HttpClient);
    url = `http://localhost:3000/auth`;
    private storage = inject(BROWSER_TOKEN)
    private logoutActions = inject(LOGOUT_ACTIONS, { optional: true }) ?? [];
    private router = inject(Router)
    
    currentUser = signal<IUser | null>(JSON.parse(this.storage.getItem('user_data') || 'null'));

    login(formValue: any) {
        return this.http.post(`${this.url}/login`, formValue, { withCredentials: true })
            .pipe(
                tap(user => this.handleAuth(user))
            )
    }
    register(formValue: any) {
        return this.http.post(`${this.url}/register`, formValue, { withCredentials: true })
            .pipe(
                tap(user => this.handleAuth(user))
            );
    }

    handleAuth(user: any) {
        this.storage?.setItem('user_data', JSON.stringify(user))
        this.currentUser.set(user)
    }

    logout() {
        // this.storage?.removeItem('user_data');
        this.logoutActions.forEach(action => action.perform());
        this.currentUser.set(null)
        this.router.navigate(['/login']);
    }
}

export class StorageLogoutAction implements ILogoutAction {
    private storage = inject(BROWSER_TOKEN);
    perform() {
        this.storage.removeItem('user_data');
        console.log('🧹 Сториджът е изчистен');
    }
}