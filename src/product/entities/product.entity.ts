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

@Entity({synchronize: false})
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

  @Column({ nullable: false})
  createdAt: Date;
  
  @Column({ type: 'int', nullable: false})
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ nullable: false })
  updatedAt: Date;

  @Column({ type: 'int', nullable: false })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @Column({ nullable: true, select: false })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  @Column({ type: 'int', nullable: true, select: false }) // Exclude this field from SELECT queries
  deletedBy: User;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]; // Relasi satu-ke-banyak dengan Rating
}
