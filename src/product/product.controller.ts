import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('products')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() productData: any) {
    return this.productService.create(productData);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() productData: any) {
    return this.productService.update(+id, productData);
  }

  @Delete(':id')
  @Roles('admin')
  softDelete(@Param('id') id: number, @Body('deletedBy') deletedBy: number) {
    return this.productService.softDelete(+id, deletedBy);
  }
}
