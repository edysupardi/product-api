import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Variety } from 'src/variety/entities/variety.entity';
import { User } from 'src/user/entities/user.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Entity({ synchronize: false })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Variety, (variety) => variety.products)
  @JoinColumn({ name: 'variety_id' })
  variety: Variety;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'int', nullable: false })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'int', nullable: false })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  @Column({ name: 'deleted_by', type: 'int', nullable: true, select: false }) // Exclude this field from SELECT queries
  deletedBy: User;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number; // Rating dengan nilai desimal

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]; // Relasi satu-ke-banyak dengan Rating
}
