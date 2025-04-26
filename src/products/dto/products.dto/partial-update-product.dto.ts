import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PartialUpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  customerId?: number;
}