import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async create(roleData: Partial<Role>) {
    const role = this.roleRepository.create(roleData);
    return await this.roleRepository.save(role);
  }

  async update(id: number, roleData: Partial<Role>) {
    await this.roleRepository.update(id, roleData);
    return await this.findOne(id);
  }

  async delete(id: number) {
    return await this.roleRepository.delete(id);
  }
}
