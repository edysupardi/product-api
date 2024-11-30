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

  async findAll() {
    return await this.varietyRepository.find();
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
