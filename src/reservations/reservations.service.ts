import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  findAll() {
    return this.reservations;
  }

  findById(id: string) {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  create(createReservationDto: CreateReservationDto) {
    const id = 'id';
    const userId = 'userId';
    const createdAt = new Date();
    return this.reservations.push({
      id,
      userId,
      createdAt,
      ...createReservationDto,
    });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    const existingReservation = this.findById(id);
    if (existingReservation) {
      // update
    }
  }

  remove(id: string) {
    // remove reservation my id
  }
}
