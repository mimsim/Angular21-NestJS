import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/products';
import { Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product-interface';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../material.providers';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
  providers: [ProductService]
})
export class CreateProduct {
  formBuilder = inject(FormBuilder);
  private productsService = inject(ProductService);
  router = inject(Router);
  isSubmitting = signal(false);
  private dialogRef = inject(MatDialogRef<CreateProduct>);
  
  productForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  })

  submitProductForm() {  
    if (this.productForm.invalid) {
      return;
    }
    this.isSubmitting.set(true);
    this.productsService.createProduct(this.productForm.value).subscribe({
      next: (newProduct: IProduct) => {
        console.log('Успешно създаден с ID:', newProduct.id);
        this.dialogRef.close(true);
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.isSubmitting.set(false);
        this.productForm.reset()
      },
      complete: () => {
        this.isSubmitting.set(false);
        this.productForm.reset()
      }
    });
  }
}
