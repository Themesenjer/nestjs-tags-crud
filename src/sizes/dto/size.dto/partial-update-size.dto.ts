import { IsString, IsOptional } from 'class-validator';

export class PartialUpdateSizeDto {
  @IsOptional()
  @IsString()
  ecuador?: string;

  @IsOptional()
  @IsString()
  usa?: string;

  @IsOptional()
  @IsString()
  category?: string;
}