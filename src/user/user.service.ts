import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generate salt dengan tingkat keamanannya
    return bcrypt.hash(password, salt); // Meng-enkripsi password
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    // Menghapus password sebelum mengembalikannya
    if (user) {
      delete user.password;
    }

    return user;
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { roleId, password, ...userData } = createUserDto;

    // Mengenkripsi password
    const hashedPassword = await this.hashPassword(password);

    // Menggunakan objek FindOneOptions untuk mencari role
    const role = await this.roleRepository.findOne({
      where: { id: roleId }, // Properti "id" dari Role
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roleId, password, ...userData } = updateUserDto;

    const userToUpdate = await this.userRepository.findOne({
      where: { id }, // Properti "id" dari User
    });
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    if (password) {
      const hashedPassword = await this.hashPassword(password);
      userToUpdate.password = hashedPassword;
    }

    if (roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: roleId }, // Properti "id" dari Role
      });
      if (!role) {
        throw new Error('Role not found');
      }
      userToUpdate.role = role;
    }

    Object.assign(userToUpdate, userData);
    return await this.userRepository.save(userToUpdate);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
