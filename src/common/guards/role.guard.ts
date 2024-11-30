import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Jika tidak ada role yang diatur, izinkan akses
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // User diambil dari request (setelah lewat JWT)

    if (!user || !user.role) {
      return false; // Jika user tidak ada atau tidak memiliki role, akses ditolak
    }

    return roles.includes(user.role.name);
  }
}
