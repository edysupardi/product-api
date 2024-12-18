import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @Roles('user')
  async create(@Req() req, @Body() body: { product_id: number; value: number }) {
    const userId = req.user.id; // Ambil ID user dari JWT
    const { product_id, value } = body;
    return await this.ratingService.addRating(userId, product_id, value);
  }
}
