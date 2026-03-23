import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  url = `http://localhost:3000/auth`;
  
  login(formValue: any) {
    return this.http.post(`${this.url}/login`, formValue,{ withCredentials: true })
  }
  register(formValue: any) {
    return this.http.post(`${this.url}/register`, formValue, { withCredentials: true })
  }
}
