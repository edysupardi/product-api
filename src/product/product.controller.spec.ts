import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

describe('ProductController', () => {
  let productController: ProductController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productService: ProductService;

  const mockProductService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mocking guards
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1, name: 'Product 1' }];
      mockProductService.findAll.mockResolvedValue(result);

      const response = await productController.findAll('10', '0', 'id', 'ASC');
      expect(response).toEqual(result);
      expect(mockProductService.findAll).toHaveBeenCalledWith(
        10,
        0,
        'id',
        'ASC',
      );
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = { id: 1, name: 'Product 1' };
      mockProductService.findOne.mockResolvedValue(result);

      const response = await productController.findOne(1);
      expect(response).toEqual(result);
      expect(mockProductService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = { name: 'New Product' };
      const request = { user: { id: 1 } }; // Mock request object
      mockProductService.create.mockResolvedValue(productData);

      const response = await productController.create(productData, request);
      expect(response).toEqual(productData);
      expect(mockProductService.create).toHaveBeenCalledWith(
        productData,
        request,
      );
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const productData = { name: 'Updated Product' };
      const request = { user: { id: 1 } }; // Mock request object
      mockProductService.update.mockResolvedValue(productData);

      const response = await productController.update(1, productData, request);
      expect(response).toEqual(productData);
      expect(mockProductService.update).toHaveBeenCalledWith(
        1,
        productData,
        request,
      );
    });
  });

  describe('softDelete', () => {
    it('should soft delete a product', async () => {
      const request = { user: { id: 1 } }; // Mock request object
      mockProductService.softDelete.mockResolvedValue({ success: true });

      const response = await productController.softDelete(1, request);
      expect(response).toEqual({ success: true });
      expect(mockProductService.softDelete).toHaveBeenCalledWith(1, request);
    });
  });
});
