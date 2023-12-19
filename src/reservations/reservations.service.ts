import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  private reservations: Reservation[] = [];

  findAll() {
    return this.reservationRepository.find();
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

  create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepository.create(createReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const existingReservation = await this.reservationRepository.preload({
      id,
      ...updateReservationDto,
    });

    if (existingReservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }

    return this.reservationRepository.save(existingReservation);
  }

  async remove(id: string) {
    const reservation = await this.findById(id);

    return this.reservationRepository.remove(reservation);
  }
}
