import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      withDeleted: false,
      relations: ['ratings'],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    console.log('product found', product);
    console.log('rating', product.ratings);

    // Jika produk memiliki rating
    if (product.ratings.length === 0) {
      console.log('rating untuk product ini tidak ada');
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
    try {
      // Menggunakan { where: { id: userId } } untuk mencari berdasarkan id
      const user = await this.userRepository.findOne({
        where: { id: userId },
        withDeleted: false,
      });

      const product = await this.productRepository.findOne({
        where: { id: productId },
        withDeleted: false,
        select: ['id', 'name', 'rating']
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Cek apakah user sudah pernah memberi rating untuk produk ini
      const existingRating = await this.ratingRepository.findOne({
        where: { user: { id: userId }, product: { id: productId } },
        relations: ['user'],
      });

      if (existingRating) {
        console.error('You has already rated this product');
        existingRating.product = product;
        return existingRating;
      }

      const rating = this.ratingRepository.create({
        value,
        user,
        product,
      });
  
      const saveRating = await this.ratingRepository.save(rating);
      if(!saveRating){
        throw new InternalServerErrorException('Rating failed');
      }

      // Hitung rata-rata rating setelah menambahkan rating baru
      const averageRating = await this.calculateProductRating(productId);

      // Perbarui kolom rating di tabel produk
      product.rating = averageRating;
      // perbarui kolom rating di table product
      const saveProduct = await this.productRepository.save(product);
      if(!saveProduct){
        throw new InternalServerErrorException('Failed to calculate rating');
      }

      saveRating.product = product;

      return saveRating;
    } catch (error) {
      throw error;
    }
  }
}
