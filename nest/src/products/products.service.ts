import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { defer, from, switchMap, throwError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private product: Repository<Product>
  ) { }


  create(createProductDto: CreateProductDto) {
    return this.product.save(createProductDto);
  }

  findAll() {
    return this.product.find();
  }

  findOne(id: number) {
    return this.product.findOneBy({ id })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return defer(() => this.findOne(id) ?? Promise.resolve(null)).pipe(
      switchMap(product => {
        if (!product) {
          return throwError(() => new NotFoundException('user not found'));
        }
        Object.assign(product, updateProductDto);
        return from(this.product.save(product));
      })
    );
  }

  remove(id: number) {
    return defer(() => this.findOne(id) ?? Promise.resolve(null)).pipe(
      switchMap(product => {
        if (!product) {
          return throwError(() => new NotFoundException('user not found'));
        }
        return from(this.product.remove(product));
      })
    );
  }
}
