import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { ProductInputDto } from './products.input.dto';
describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productController = app.get<ProductsController>(ProductsController);
    productService = app.get<ProductsService>(ProductsService);
  });

  describe('products routes', () => {
    it('should return product with price 10', async () => {
      const product = await productController.getProductById(1);
      expect(product.price).toEqual(10);
    });
    it('should return an array of products', async () => {
      const products = await productController.getProducts();
      expect(products.length).toEqual(2);
    });
    it('should increment the length of the products array by 1', async () => {
      const product: ProductInputDto = {
        name: 'New Test Product',
        price: 0,
        category: 'Home appliance',
        dateCreated: 0,
      };
      const products = await productController.createProduct(product);
      expect(products.length).toEqual(3);
    });
  });
});
