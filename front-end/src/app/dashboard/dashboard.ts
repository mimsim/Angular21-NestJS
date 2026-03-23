import { Component } from '@angular/core';
import { ListProducts } from '../products/list-products/list-products';
import { MATERIAL_MODULES } from '../material.providers';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ListProducts, ...MATERIAL_MODULES],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
