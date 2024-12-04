import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
  Put,
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
  findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    const limitValue = limit ? parseInt(limit, 10) : 10; // Default limit to 10
    const offsetValue = offset ? parseInt(offset, 10) : 0; // Default offset to 0
    const sortField = sort || 'id'; // Default sort field
    const orderDirection = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // Default order direction
    return this.productService.findAll(
      limitValue,
      offsetValue,
      sortField,
      orderDirection,
    );
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() productData: any, @Request() request) {
    return this.productService.create(productData, request);
  }

  @Put(':id')
  @Roles('admin')
  update(
    @Param('id') id: number,
    @Body() productData: any,
    @Request() request,
  ) {
    return this.productService.update(+id, productData, request);
  }

  @Delete(':id')
  @Roles('admin')
  softDelete(@Param('id') id: number, @Request() request) {
    return this.productService.softDelete(+id, request);
  }
}
