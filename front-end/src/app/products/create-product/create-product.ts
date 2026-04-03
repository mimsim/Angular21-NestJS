import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/products';
import { Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product-interface';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../material.providers';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
})
export class CreateProduct {
  formBuilder = inject(FormBuilder);
  productsService = Inject(ProductService);
  router = inject(Router);
  isSubmitting = signal(false);

  productForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  })

  submitProductForm() {
    if (this.productForm.invalid) {
      return
    }
    this.isSubmitting.set(false);
    this.productsService.createProduct(this.productForm.value).subscribe({
      next: (newProduct: IProduct) => {
        console.log(newProduct.id);
        this.router.navigate(['/products'])
      },
      error: () => this.isSubmitting.set(false)
    })
  }
}
