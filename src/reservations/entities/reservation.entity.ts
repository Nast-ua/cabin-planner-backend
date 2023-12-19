import { Column, CreateDateColumn, Entity, Generated } from 'typeorm';

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

  @Column()
  userId: string;
}
