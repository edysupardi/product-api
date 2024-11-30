import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // Pastikan sudah terimport
import { AuthController } from './auth.controller'; // Pastikan sudah terimport
import { JwtModule } from '@nestjs/jwt'; // Pastikan JWT module sudah diimport

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ganti dengan secret yang sesuai
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRATION) }, // Set waktu kadaluwarsa JWT sesuai kebutuhan
    }),
  ],
  providers: [AuthService], // Pastikan AuthService terdaftar di providers
  controllers: [AuthController], // Pastikan AuthController terdaftar di controllers
})
export class AuthModule {}
