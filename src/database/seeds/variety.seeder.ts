import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variety } from 'src/variety/entities/variety.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VarietySeeder {
  constructor(
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
  ) {}

  async seed() {
    await this.varietyRepository.save([
      {
        id: 1,
        name: 'Laptop',
      },
      {
        id: 2,
        name: 'Mini PC',
      },
      {
        id: 3,
        name: 'Smartphone',
      },
    ]);
  }
}
