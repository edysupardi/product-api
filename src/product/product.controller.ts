import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
