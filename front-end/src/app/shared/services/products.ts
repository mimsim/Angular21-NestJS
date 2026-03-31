import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProduct } from '../interfaces/product-interface';
import { BROWSER_TOKEN } from '../../core/storage.token';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
	private http = inject(HttpClient);
	url = `http://localhost:3000/products`;

	constructor(@Inject(BROWSER_TOKEN) private storage: Storage) { }

	saveToken(token: string) {
		this.storage.setItem('auth_token', token)
	}
	getToken() {
		return this.storage.getItem('auth_token')
	}
	getAllProducts(): Observable<IProduct[]> { 
		return this.http.get<IProduct[]>(this.url);
	}
	getProductById(id: string): Observable<IProduct> {
		return this.http.get<IProduct>(`${this.url}/${id}`).pipe(
			tap(data => console.log('Данни от сървъра:', data)) );
	}
}
