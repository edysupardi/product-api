import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service'; // Pastikan diimpor dengan benar
import { LoginDto } from './dto/login.dto'; // Pastikan Anda memiliki DTO untuk login

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    await this.authService.login(loginDto, res); // Memanggil login method di AuthService
    return res.send();
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    res.send();
  }
}
