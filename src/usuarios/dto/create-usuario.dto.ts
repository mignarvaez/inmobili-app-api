import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'prueba@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Pedro perez' })
  @IsString()
  readonly nombre: string;

  @ApiProperty({ example: '120128131' })
  @IsString()
  readonly identificacion: string;

  @ApiProperty({ example: '2434122' })
  @IsString()
  readonly telefono: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  readonly contrasena: string;
}
