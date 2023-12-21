import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly ownerName: string;

  @IsString()
  readonly startDate: string;

  @IsString()
  readonly endDate: string;

  @IsNumber()
  readonly duration: number;

  @IsNumber()
  readonly participants: number;
}

// {
//   "name": "testReservation",
//   "startDate": "2023-12-19",
//   "endDate": "2023-12-20",
//   "duration": 1,
//   "participants": 1
// }
