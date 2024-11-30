import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Variety } from '../../variety/entities/variety.entity';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
  ) {}

  async seed() {
    // Mengambil variety berdasarkan ID
    const laptopVariety = await this.varietyRepository.findOne({
      where: { id: 1 },
    });
    const miniPCVariety = await this.varietyRepository.findOne({
      where: { id: 2 },
    });
    const smartphoneVariety = await this.varietyRepository.findOne({
      where: { id: 3 },
    });

    // Data produk untuk Variety Laptop
    const laptopProducts = [
      {
        name: 'Laptop ASUS',
        description: 'Laptop ASUS dengan prosesor terbaru',
        price: 1000,
        variety: laptopVariety,
        stock: 50,
        rating: 4.5,
      },
      {
        name: 'Laptop Dell',
        description: 'Laptop Dell dengan desain premium',
        price: 1200,
        variety: laptopVariety,
        stock: 40,
        rating: 4.7,
      },
      {
        name: 'Laptop HP',
        description: 'Laptop HP dengan performa tinggi',
        price: 900,
        variety: laptopVariety,
        stock: 60,
        rating: 4.6,
      },
      {
        name: 'Laptop Lenovo',
        description: 'Laptop Lenovo dengan harga terjangkau',
        price: 800,
        variety: laptopVariety,
        stock: 70,
        rating: 4.3,
      },
    ];

    // Data produk untuk Variety Mini PC
    const miniPCProducts = [
      {
        name: 'Mini PC Intel',
        description: 'Mini PC dengan prosesor Intel terbaru',
        price: 500,
        variety: miniPCVariety,
        stock: 30,
        rating: 4.2,
      },
      {
        name: 'Mini PC AMD',
        description: 'Mini PC dengan prosesor AMD yang kuat',
        price: 550,
        variety: miniPCVariety,
        stock: 25,
        rating: 4.4,
      },
      {
        name: 'Mini PC Raspberry Pi',
        description: 'Mini PC murah dan ringan dengan Raspberry Pi',
        price: 100,
        variety: miniPCVariety,
        stock: 100,
        rating: 4.1,
      },
      {
        name: 'Mini PC Mac Mini',
        description: 'Mini PC dari Apple, Mac Mini dengan kualitas premium',
        price: 800,
        variety: miniPCVariety,
        stock: 20,
        rating: 4.8,
      },
    ];

    // Data produk untuk Variety Smartphone
    const smartphoneProducts = [
      {
        name: 'Smartphone Samsung',
        description: 'Smartphone Samsung dengan fitur unggulan',
        price: 700,
        variety: smartphoneVariety,
        stock: 120,
        rating: 4.6,
      },
      {
        name: 'Smartphone Xiaomi',
        description: 'Smartphone Xiaomi dengan harga terjangkau',
        price: 400,
        variety: smartphoneVariety,
        stock: 200,
        rating: 4.4,
      },
      {
        name: 'Smartphone Apple',
        description: 'Smartphone premium dari Apple, iPhone terbaru',
        price: 1200,
        variety: smartphoneVariety,
        stock: 50,
        rating: 4.9,
      },
      {
        name: 'Smartphone Oppo',
        description: 'Smartphone Oppo dengan kamera berkualitas tinggi',
        price: 600,
        variety: smartphoneVariety,
        stock: 80,
        rating: 4.3,
      },
    ];

    // Menyimpan semua produk ke database
    await this.productRepository.save([
      ...laptopProducts,
      ...miniPCProducts,
      ...smartphoneProducts,
    ]);
  }
}
