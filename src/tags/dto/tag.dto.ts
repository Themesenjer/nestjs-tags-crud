import {
    IsInt,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class CreateTagDto {
    @IsString()
    @MaxLength(30)
    @MinLength(0, { message: 'No se puede enviar vacio' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message: 'El nombre solo debe contener letras y espacios',
    })
    name: string;
  
    @IsString()
    @MaxLength(100)
    @MinLength(0, { message: 'No se puede enviar vacio' })
    description: string;
  
    @IsInt({ message: 'El stock debe ser un numero entero' })
    @Min(0, { message: 'El stock debe ser 0 o mas de 0' })
    stock: number;
  
    @IsString()
    @MinLength(0, { message: 'No se puede enviar vacio' })
    @Matches(/^[a-z0-9\-]+$/, {
      message: 'El slug solo debe contener letras minúsculas, números y guiones',
    })
    slug: string;
  }
  
  export class UpdateTagDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;
  
    @IsOptional()
    @IsString()
    slug?: string;
  }
  