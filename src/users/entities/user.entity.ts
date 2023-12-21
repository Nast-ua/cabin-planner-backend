import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email', 'clerkId'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: string;

  @Column({ nullable: true })
  admin: boolean;

  @Column({ default: false })
  approved: boolean;

  @Column()
  clerkId: string;

  @JoinTable()
  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];
}
