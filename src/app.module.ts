import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeeder } from './database/seeds/user.seeder';
import { RoleSeeder } from './database/seeds/role.seeder';
import { VarietySeeder } from './database/seeds/variety.seeder';
import { ProductSeeder } from './database/seeds/product.seeder';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Variety } from './variety/entities/variety.entity';
import { Product } from './product/entities/product.entity';
import { Rating } from './rating/entities/rating.entity';
import { AuthController } from './auth/auth.controller';
import { ProductController } from './product/product.controller';
import { RatingController } from './rating/rating.controller';
import { RoleController } from './role/role.controller';
import { UserController } from './user/user.controller';
import { VarietyController } from './variety/variety.controller';
import { AuthService } from './auth/auth.service';
import { ProductService } from './product/product.service';
import { RatingService } from './rating/rating.service';
import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { VarietyService } from './variety/variety.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: false, // Jangan gunakan di production
      entities: [User, Role, Variety, Product, Rating], // Memastikan semua entitas dimuat
      extra: {
        connectTimeout: 10000, // Tambahkan timeout jika koneksi lama
      },
    }),
    TypeOrmModule.forFeature([User, Role, Variety, Product, Rating]), // Tambahkan semua repository
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ambil secret key dari file .env
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRATION) }, // Atur waktu kedaluwarsa JWT
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    RatingController,
    RoleController,
    UserController,
    VarietyController,
  ],
  providers: [
    AppService,
    AuthService,
    ProductService,
    RatingService,
    RoleService,
    UserService,
    VarietyService,
    UserSeeder,
    RoleSeeder,
    ProductSeeder,
    VarietySeeder,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly varietySeeder: VarietySeeder,
    private readonly productSeeder: ProductSeeder,
  ) {}

  async onModuleInit() {
    // Eksekusi seeder di sini
    console.log('Seeding data...');
    // await this.roleSeeder.seed();
    // await this.userSeeder.seed();
    // await this.varietySeeder.seed();
    // await this.productSeeder.seed();
    console.log('Seeding selesai.');
  }
}
