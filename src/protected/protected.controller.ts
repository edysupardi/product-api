// Cannot find module '@nestjs/passport' or its corresponding type declarations.ts(2307)

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard) // Melindungi route ini dengan guard
  getProtectedRoute() {
    return { message: 'This is a protected route' };
  }
}
