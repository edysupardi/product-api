import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VarietyService } from './variety.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('varieties')
@UseGuards(RoleGuard)
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.varietyService.findAll();
  }

  @Post()
  @Roles('admin')
  create(@Body() varietyData: any) {
    return this.varietyService.create(varietyData);
  }
}
