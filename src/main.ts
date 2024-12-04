import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor'; // Import interceptor
import { Reflector } from '@nestjs/core'; // Import Reflector

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  app.use(helmet());
  app.enableCors({
    origin: '*', // Ganti dengan domain yang diizinkan
    methods: 'GET,PUT,POST,DELETE', // Metode yang diizinkan
    credentials: true, // Izinkan pengiriman cookie
    allowedHeaders: 'Content-Type, Authorization', // Header yang diizinkan
  }); // Mengaktifkan CORS

  // Mengatur rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // Limit setiap IP ke 100 permintaan per windowMs
    message: 'Too many requests from this IP address. Please try again later.',
  });

  // Menerapkan rate limiter secara global
  app.use(limiter);
  app.useGlobalInterceptors(new ResponseFormatInterceptor(new Reflector));

  await app.listen(PORT, () => {
    console.log(`
      Running APPS in MODE: ${process.env.NODE_ENV} on PORT: ${PORT} `);
  });
}
bootstrap();
