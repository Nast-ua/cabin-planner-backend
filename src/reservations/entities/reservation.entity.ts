import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Reservation {
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  participants: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;
}
