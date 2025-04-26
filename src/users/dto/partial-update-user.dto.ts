import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class PartialUpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  identificacion?: string;
}