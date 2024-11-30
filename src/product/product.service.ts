import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      where: { deletedAt: null },
      relations: ['variety', 'createdBy', 'updatedBy'],
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['variety', 'createdBy', 'updatedBy'],
    });
  }

  async create(productData: Partial<Product>) {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async update(id: number, productData: Partial<Product>) {
    await this.productRepository.update(id, productData);
    return await this.findOne(id);
  }

  async softDelete(id: number, deletedBy: number) {
    return await this.productRepository.update(id, {
      deletedAt: new Date(),
      deletedBy: { id: deletedBy }, // Relasi ke User
    });
  }
}
