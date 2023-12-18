import { IsDate, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  readonly ownerName: string;

  //   @IsUUID()
  //   readonly userId: string;
}
