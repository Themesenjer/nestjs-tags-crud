import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SizeDto)
  sizes?: SizeDto[];
}

class SizeDto {
  @IsNotEmpty()
  @IsString()
  ecuador: string;

  @IsNotEmpty()
  @IsString()
  usa: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}