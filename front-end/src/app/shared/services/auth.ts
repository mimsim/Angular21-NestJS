import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BROWSER_TOKEN } from '../../core/storage.token';
import { tap } from 'rxjs';
import { IUser } from '../interfaces/user-interface';

@Injectable({
    providedIn: 'root',
})
export class Auth {
    private http = inject(HttpClient);
    url = `http://localhost:3000/auth`;
    private storage = inject(BROWSER_TOKEN)

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
        this.storage?.removeItem('user_data');
        this.currentUser.set(null)
    }
}
