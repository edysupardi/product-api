import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('ratings')
@Unique(['user', 'product']) // Kombinasi unik antara user dan product
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number; // Nilai rating, misalnya dari 1 hingga 5

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.ratings, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
