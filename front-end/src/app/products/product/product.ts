import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MATERIAL_MODULES } from '../../material.providers';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../shared/services/products';
import { IProduct } from '../../shared/interfaces/product-interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent implements OnInit{
  private productService = inject(ProductService);
  item = input<IProduct>();
  id = input<string>();

  private router = inject(Router);

  isEditMode = false;

  product = computed(() => {
    const currentItem = this.item(); 
    const fetched = this.fetchedProduct(); 
    if (currentItem) return currentItem;
    return fetched;
  });
  private fetchedProduct = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => id ? this.productService.getProductById(id) : of(null))
    )    
  );
  ngOnInit() {
    console.log('ID от URL:', this.id());
    console.log('Item от родител:', this.item());
  }
  delete() {   
    if (confirm('Сигурен ли си')) {
      this.productService.deleteProductById(this.id()).subscribe(() => {
        this.fetchedProduct()
        this.router.navigate(['/products'])
      })
    }
  }
  edit() {
   
  }
}
