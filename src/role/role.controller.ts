import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() roleData: any) {
    return this.roleService.create(roleData);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() roleData: any) {
    return this.roleService.update(+id, roleData);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.roleService.delete(+id);
  }
}
