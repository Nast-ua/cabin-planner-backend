import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email', 'clerkId'])
export class User {
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: string;

  @Column()
  admin?: boolean;

  @Column()
  approved: boolean;

  @Column()
  clerkId: string;

  @JoinTable()
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
