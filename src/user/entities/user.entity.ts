import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Column({ select: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @DeleteDateColumn({ nullable: true, select: false, name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  @Column({ type: 'int', nullable: true, select: false, name: 'deleted_by' }) // Exclude this field from SELECT queries
  deletedBy: User;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]; // Relasi satu-ke-banyak dengan Rating
}
