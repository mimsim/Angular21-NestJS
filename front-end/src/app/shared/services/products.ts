import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ICreateProductRequest, IProduct } from '../interfaces/product-interface';
import { BROWSER_TOKEN } from '../../core/storage.token';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
	private http = inject(HttpClient);
	url = `http://localhost:3000/products`;
	private refreshProducts$ = new BehaviorSubject<void>(undefined);

	
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

	getProductsAfterAdd() {
		return this.refreshProducts$.pipe(
			switchMap(() => this.http.get<IProduct[]>(`${this.url}/items`))
		);
	}


	getProductById(id: string): Observable<IProduct> {
		return this.http.get<IProduct>(`${this.url}/${id}`).pipe(
			tap(data => console.log('Данни от сървъра:', data)) );
	}
	createProduct(productData: any) {
		console.log('service', productData);
		return this.http.post<ICreateProductRequest>(`${this.url}/item`, productData);
	}
	deleteProductById(id:any) {
		return this.http.delete(`${this.url}/${id}`)
	}
	updateProductById(id: any, productData: ICreateProductRequest) {
		return this.http.put<IProduct>(`${this.url}/item/${id}`, productData);
	}

	refresh() {
		this.refreshProducts$.next(); 
	}
}
