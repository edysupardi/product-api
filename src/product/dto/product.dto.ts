import { IsNotEmpty, IsOptional, IsDecimal, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' }) // Validasi untuk harga
  price: number;

  @IsNotEmpty()
  @IsInt()
  varietyId: number;

  // Tidak ada field rating di sini
}

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;

  @IsNotEmpty()
  @IsInt()
  varietyId?: number;

  // Tidak ada field rating di sini
}
