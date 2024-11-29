import { User } from 'src/user/user.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
