import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Products {
	private http = inject(HttpClient);
	url = `http://localhost:3000/products`;
	
	getAllProducts() {
		return this.http.get(`${this.url}`)
	}
}
