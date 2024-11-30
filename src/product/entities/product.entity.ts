import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Variety } from 'src/variety/entities/variety.entity';
import { User } from 'src/user/entities/user.entity';
import { Rating } from 'src/rating/entities/rating.entity';
// import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  @DeleteDateColumn({ select: false }) // Exclude this field from SELECT queries
  deletedAt: Date;

  @ManyToOne(() => Variety, (variety) => variety.products)
  @JoinColumn({ name: 'variety_id' })
  variety: Variety;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  @DeleteDateColumn({ select: false }) // Exclude this field from SELECT queries
  deletedBy: User;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]; // Relasi satu-ke-banyak dengan Rating
}
