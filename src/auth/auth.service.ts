import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Menggunakan UserService
    private readonly jwtService: JwtService, // Menggunakan JwtService untuk membuat token
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    // Verifikasi kredensial user
    const user = await this.userService.findOneByUsernameForLogin(loginDto.username);
    if (!user) {
      res.status(401).json({
        status: false,
        message: 'Invalid Credential',
      });
      return;
    }
    console.log('input password', loginDto.password)
    console.log('user password', user.password)

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        message: 'Invalid Credential', // Custom message for invalid login
      });
      return;
    }

    // Payload untuk JWT, bisa Anda sesuaikan sesuai kebutuhan
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    // Buat JWT token
    const token = this.jwtService.sign(payload);
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + parseInt(process.env.JWT_EXPIRATION),
    );

    res
      .status(200)
      .cookie('Authentication', token, {
        // Menghapus cookie
        httpOnly: true,
        expires: expires, // Mengatur expired date ke 0 untuk menghapus cookie
      })
      .json({
        status: true,
        message: 'Welcome',
        data: {
          access_token: token,
        },
      });
  }

  async logout(response: Response) {
    // Menghapus cookie 'Authentication'
    response
      .status(200)
      .cookie('Authentication', '', {
        httpOnly: true,
        expires: new Date(0), // Set cookie expired ke 0 untuk menghapusnya
      })
      .json({
        status: true,
        message: 'You have been logged out successfully',
      });
  }
}
