import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  findAll({ limit, offset }: PaginationQueryDto) {
    return this.reservationRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findById(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }

    return reservation;
  }

  async create(user: User, createReservationDto: CreateReservationDto) {
    const reservation = await this.reservationRepository.create({
      ...createReservationDto,
      user: user.id,
    });

    return this.reservationRepository.save(reservation);
  }

  async update(
    id: string,
    user: User,
    updateReservationDto: UpdateReservationDto,
  ) {
    const existingReservation = await this.reservationRepository.preload({
      id,
      ...updateReservationDto,
    });

    if (!existingReservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }

    if (user.id !== existingReservation.user)
      throw new ForbiddenException("You can't update this reservation");

    return this.reservationRepository.save(existingReservation);
  }

  async remove(id: string, user?: User) {
    const reservation = await this.findById(id);

    if (!reservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }

    if (user.id !== reservation.user)
      throw new ForbiddenException("You can't update this reservation");

    // Remove from user
    return this.reservationRepository.remove(reservation);
  }
}
