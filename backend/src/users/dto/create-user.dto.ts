import { IsEmail, IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  age: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;
}
