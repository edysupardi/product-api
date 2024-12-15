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

  @IsNotEmpty()
  @IsInt()
  stock: number;
}

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }) // Validasi untuk harga
  price: number;

  @IsNotEmpty()
  @IsInt()
  varietyId?: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;
}
