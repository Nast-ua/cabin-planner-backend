import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  private user: User = new User(); // TODO: create protected routes + get user from auth guard

  @Get()
  findAll(@Query() paginatedQuery: PaginationQueryDto) {
    return this.reservationsService.findAll(paginatedQuery);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reservationsService.findById(id);
  }

  @Post()
  create(@Body() body: CreateReservationDto) {
    return this.reservationsService.create(this.user, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateReservationDto) {
    return this.reservationsService.update(id, this.user, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
