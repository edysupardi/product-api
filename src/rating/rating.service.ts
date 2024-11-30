import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Menghitung rata-rata rating untuk produk tertentu
  async calculateProductRating(productId: number): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['ratings'], // Pastikan untuk memuat relasi ratings
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Jika produk memiliki rating
    if (product.ratings.length === 0) {
      return 0;
    }

    // Menghitung rata-rata rating
    const totalRating = product.ratings.reduce(
      (acc, rating) => acc + rating.value,
      0,
    );
    return totalRating / product.ratings.length;
  }

  // Method untuk menambah rating oleh user ke produk
  async addRating(
    userId: number,
    productId: number,
    value: number,
  ): Promise<Rating> {
    // Menggunakan { where: { id: userId } } untuk mencari berdasarkan id
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    // Cek apakah user sudah pernah memberi rating untuk produk ini
    const existingRating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existingRating) {
      throw new Error('User has already rated this product');
    }

    const rating = this.ratingRepository.create({
      value,
      user,
      product,
    });

    return this.ratingRepository.save(rating);
  }
}
