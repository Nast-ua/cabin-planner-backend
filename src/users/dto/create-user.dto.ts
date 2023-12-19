import { IsBoolean, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  name: string;

  @IsOptional()
  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  approved: boolean;

  @IsUUID()
  clerkId: string;
}
