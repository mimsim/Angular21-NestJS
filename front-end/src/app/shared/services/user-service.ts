import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUser } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'

  users = signal<IUser[]>([]);
  isLoading = signal(false)
  fetchUsers() {
    this.isLoading.set(true);
    this.http.get<IUser[]>(`${this.apiUrl}/auth`).subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false)
      }
    })
  }
  deleteUserById(id: any) {
    this.isLoading.set(true);
    this.http.delete(`${this.apiUrl}/auth/${id}`)
  }
}
