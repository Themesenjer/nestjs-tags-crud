import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, Matches, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo debe contener letras y espacios',
  })
  name: string;

  @Type(() => Number)
  @IsInt({ message: 'La edad debe ser un número entero' })
  age: number;

  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe tener el formato AAAA-MM-DD' })
  birthday: Date;

  @IsNotEmpty()
  @IsString({
    message: 'Colocar su lugar de residencia completo, incluyendo intersecciones',
  })
  recidence: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El email debe ser un email válido' })
  email: string;  
}