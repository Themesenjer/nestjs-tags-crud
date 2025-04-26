import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  userId?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  customerId?: number;

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