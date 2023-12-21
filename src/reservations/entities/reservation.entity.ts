import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ownerName: string;

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

  @ManyToOne(() => User, (user) => user.reservations, { cascade: true })
  user: string;
}
