import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  name: string;

  @IsOptional()
  @IsBoolean()
  admin: boolean;

  @IsOptional()
  @IsBoolean()
  approved: boolean;

  @IsString()
  clerkId: string;
}

// {
//   "email": "test@test.com",
//   "clerkId": "test1clerkId"
// }
