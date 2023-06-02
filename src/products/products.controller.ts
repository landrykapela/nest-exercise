import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { ProductInputDto } from './products.input.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(Number(id));
  }

  @Get('')
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Post('')
  async createProduct(@Body() product: ProductInputDto): Promise<Product[]> {
    return this.productsService.createProduct(product);
  }
}

