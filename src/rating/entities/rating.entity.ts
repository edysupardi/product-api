import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('ratings')
@Unique(['user', 'product']) // Kombinasi unik antara user dan product
export class Rating {
  @PrimaryColumn({ name: 'user_id' })
  userId: number; // ID pengguna, menjadi bagian dari composite primary key

  @PrimaryColumn({ name: 'product_id' })
  productId: number; // ID produk, menjadi bagian dari composite primary key

  @Column()
  value: number; // Nilai rating, misalnya dari 1 hingga 5

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
