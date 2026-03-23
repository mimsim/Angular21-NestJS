import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../shared/services/products';
import { MATERIAL_MODULES } from '../../material.providers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-products',
  imports: [
    CommonModule,
    ...MATERIAL_MODULES],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts implements OnInit{
  private productService = inject(Products)
  products: any;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
   return this.productService.getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data
          console.log('this.products', this.products)
        },
        error: (err) => console.error('Error fetching products', err)
      });
  }
}
