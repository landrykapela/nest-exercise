import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { ProductInputDto } from './products.input.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(Number(id));
  }

  @Get('')
  @UseGuards(new AuthGuard())
  async getProducts(@Req() _req?: Request, @Res() _res?: Response) {
    const result = await this.productsService.getProducts();
    console.log(
      '🚀 ~ file: products.controller.ts:19 ~ ProductsController ~ getProducts ~ result:',
      result,
    );
    return _res.status(200).json(result);
  }

  @Post('')
  async createProduct(@Body() product: ProductInputDto): Promise<Product[]> {
    return this.productsService.createProduct(product);
  }
}
