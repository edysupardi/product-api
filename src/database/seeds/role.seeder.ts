import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    await this.roleRepository.save([
      {
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'user',
      },
    ]);
  }
}
