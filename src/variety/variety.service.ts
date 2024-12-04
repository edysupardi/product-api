import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variety } from './entities/variety.entity';

@Injectable()
export class VarietyService {
  constructor(
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
  ) {}

  async findAll(
    limit: number,
    offset: number,
    sort: string,
    order: 'ASC' | 'DESC',
  ) {
    return await this.varietyRepository.find({
      take: limit,
      skip: offset,
      order: {
        [sort]: order, // Mengatur pengurutan berdasarkan field dan arah
      },
    });
  }

  async findOne(id: number) {
    return await this.varietyRepository.findOne({
      where: { id },
    });
  }

  async create(varietyData: Partial<Variety>) {
    const variety = this.varietyRepository.create(varietyData);
    return await this.varietyRepository.save(variety);
  }
}
