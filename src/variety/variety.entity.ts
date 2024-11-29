import { Product } from 'src/product/product.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Variety {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.variety)
  products: Product[];
}
