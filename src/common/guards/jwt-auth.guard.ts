import { Injectable } from '@nestjs/common';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/auth/jwt-payload.interface'; // Pastikan Anda sudah memiliki interface untuk JWT Payload
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      return false;
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      // request.user = payload; // Menyimpan data pengguna yang sudah terverifikasi ke dalam request
      // console.log(payload);

      // Ambil user dari database menggunakan userId dari payload
      const user = await this.userService.findOne(payload.id);

      if (!user) {
        return false; // User tidak ditemukan
      }

      // Simpan data user ke request untuk digunakan di controller
      request.user = user;

      return true;
    } catch (error) {
      console.log(error, authorization);
      return false;
    }
  }
}
