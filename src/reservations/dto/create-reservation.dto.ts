import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  readonly name: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsNumber()
  readonly duration: number;

  @IsNumber()
  readonly participants: number;

  @IsUUID()
  readonly userId: string;
}
