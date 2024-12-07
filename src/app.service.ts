import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const now = new Date();
    const currentTime = now.toUTCString(); // Menggunakan UTC, Anda bisa menggunakan toLocaleString() untuk format lokal
    return `API Product v1.0 at ${currentTime}`;
  }
}
