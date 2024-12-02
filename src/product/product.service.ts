import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(
    limit: number,
    offset: number,
    sort: string,
    order: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    return await this.productRepository.find({
      where: { deletedAt: null },
      relations: ['variety', 'createdBy', 'updatedBy'],
      take: limit,
      skip: offset,
      order: {
        [sort]: order, // Mengatur pengurutan berdasarkan field dan arah
      },
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['variety', 'createdBy', 'updatedBy'],
    });
  }

  async create(productData: CreateProductDto, @Request() request) {
    const userId = request.user.id;
    const date = new Date();
    const product = this.productRepository.create({
      ...productData,
      createdAt: date,
      createdBy: userId,
      updatedAt: date,
      updatedBy: userId,
    });
    return await this.productRepository.save(product);
  }

  async update(id: number, productData: UpdateProductDto, @Request() request) {
    const userId = request.user.id;
    const date = new Date();
    await this.productRepository.update(id, {
      ...productData,
      updatedAt: date,
      updatedBy: userId,
    });
    return await this.findOne(id);
  }

  async softDelete(id: number, @Request() request) {
    const userId = request.user.id;
    return await this.productRepository.update(id, {
      deletedAt: new Date(),
      deletedBy: userId, // Relasi ke User
    });
  }
}
