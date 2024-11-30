import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'; // Import PassportStrategy, bukan JwtStrategy
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Pastikan interface ini ada dan benar
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
// import { User } from '../user/user.entity';  // Import model User

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Gunakan PassportStrategy dengan Strategy
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Ganti dengan secret key yang aman
    });
  }

  // Validasi payload dari JWT
  async validate(payload: JwtPayload): Promise<User> {
    // Cari user berdasarkan userId yang ada di dalam payload JWT
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new Error('User not found');
    }
    console.log('user', user.id);
    return {
      ...user,
      role: user.role,
    };
  }
}
