import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const now = new Date();
    const currentTime = now.toUTCString(); // Menggunakan UTC, Anda bisa menggunakan toLocaleString() untuk format lokal

    return `
      <h1>Welcome to My Application</h1>
      <p>Current Time: ${currentTime}</p>
      <p>This is a simple API for managing product.</p>
      <p>Version: 1.0.0</p>
      <h2>API Documentation</h2>
      <p>Visit <a href="/docs">here</a> for API documentation.</p>
      <h2>Status</h2>
      <p>Server Status: <strong>Online</strong></p>
    `;
  }
}
