import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarietyService } from './variety.service';
import { VarietyController } from './variety.controller';
import { Variety } from './entities/variety.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variety])],
  controllers: [VarietyController],
  providers: [VarietyService],
})
export class VarietyModule {}
