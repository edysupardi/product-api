import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { VarietyService } from './variety.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('varieties')
@UseGuards(JwtAuthGuard, RoleGuard)
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}

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
    return this.varietyService.findAll(
      limitValue,
      offsetValue,
      sortField,
      orderDirection,
    );
  }

  @Post()
  @Roles('admin')
  create(@Body() varietyData: any) {
    return this.varietyService.create(varietyData);
  }
}
