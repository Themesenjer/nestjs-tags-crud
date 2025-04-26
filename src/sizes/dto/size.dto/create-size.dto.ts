import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
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