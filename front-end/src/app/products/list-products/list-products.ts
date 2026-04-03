import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/products';
import { MATERIAL_MODULES } from '../../material.providers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProduct } from '../../shared/interfaces/product-interface';
import { ProductComponent } from '../product/product';
import { MatDialog } from '@angular/material/dialog';
import { CreateProduct } from '../create-product/create-product';


@Component({
  selector: 'app-list-products',
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    RouterModule,
    ProductComponent
  ],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
})
export class ListProducts {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  products = toSignal(this.productService.getAllProducts(), {
    initialValue: [] as IProduct[]
  });
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProduct, {
      width: '550px',
      disableClose: true, 
      autoFocus: 'first-tabbable',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Диалогът беше затворен с данни:', result);
      }
    });
  }
}
