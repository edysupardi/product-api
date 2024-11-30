import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const password = await bcrypt.hash('password', 10);
    await this.userRepository.save([
      {
        username: 'admin',
        password,
        role: { id: 1 }, // Menggunakan role dengan ID 1
      },
      {
        username: 'user1',
        password,
        role: { id: 2 }, // Menggunakan role dengan ID 2
      },
    ]);
  }
}
