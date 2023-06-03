import { Injectable } from '@nestjs/common';
import { Product } from './products.model';
import { DateTime } from 'luxon';
import { ProductInputDto } from './products.input.dto';

@Injectable()
export class ProductsService {
  products: Array<Product> = [
    {
      id: 0,
      name: 'JD Men Shirt',
      price: 15,
      category: 'Clothing',
      dateCreated: DateTime.fromMillis(Date.now())
        .minus({ day: 12 })
        .toMillis(),
    },
    {
      id: 1,
      name: 'JD Ladies Shirt',
      price: 10,
      category: 'Clothing',
      dateCreated: DateTime.fromMillis(Date.now())
        .minus({ day: 10 })
        .toMillis(),
    },
  ];

  async getProducts(): Promise<Product[]> {
    return this.products;
  }
  async getProductById(id: number): Promise<Product> {
    console.log(
      '🚀 ~ file: products.service.ts:33 ~ ProductsService ~ getProductById ~ id:',
      id,
    );

    const product: Product = this.products.find(
      (product: Product) => product.id === id,
    );
    console.log(
      '🚀 ~ file: products.service.ts:36 ~ ProductsService ~ getProductById ~ product:',
      product,
      id,
    );
    return product;
  }
  async createProduct(product: ProductInputDto): Promise<Product[]> {
    const newProduct: Product = {
      id: this.products.length,
      name: product.name,
      category: product.category,
      dateCreated: Date.now(),
      price: product.price,
    };
    this.products.push(newProduct);
    return this.products;
  }
}
