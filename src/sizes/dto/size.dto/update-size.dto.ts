import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSizeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ecuador?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  usa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;
}