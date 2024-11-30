import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @Roles('user')
  async create(@Req() req, @Body() body: { productId: number; value: number }) {
    const userId = req.user.id; // Ambil ID user dari JWT
    const { productId, value } = body;
    return await this.ratingService.addRating(userId, productId, value);
  }
}
