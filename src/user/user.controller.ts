import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';

@Controller('users')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number, @Request() request) {
    return this.userService.delete(+id, request);
  }
}
