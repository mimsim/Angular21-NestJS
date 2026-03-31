import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MATERIAL_MODULES } from '../../material.providers';
import { RouterModule } from '@angular/router';
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
export class ProductComponent {
  private productService = inject(ProductService);

  // Входове
  item = input<IProduct>(); // Идва от списъка
  id = input<string>();    // Идва от URL (при детайлна страница)

  // Ако имаме 'id' от URL, теглим данните. Ако имаме 'item', ползваме него.
  product = computed(() => {
    const currentItem = this.item();
    if (currentItem) return currentItem;

    // Тук използваме fetchedProduct, който дефинирахме по-рано
    return this.fetchedProduct();
  });

  private fetchedProduct = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => id ? this.productService.getProductById(id) : of(null))
    )
  );
}
