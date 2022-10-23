import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsObject, IsString } from 'class-validator';
import { EspecificacionesDto } from './especificaciones.dto';

export class CreateInmuebleDto {
  @ApiProperty({ example: 'prueba@email.com' })
  @IsEmail()
  readonly propietario: string;

  @ApiProperty({ example: 'Apartamento en cali' })
  @IsString()
  readonly titulo: string;

  @ApiProperty({ example: 'Arriendo apartamento amplio' })
  @IsString()
  readonly descripcion: string;

  @ApiProperty({ type: EspecificacionesDto })
  @IsObject()
  especificaciones: EspecificacionesDto;

  @ApiProperty({ example: 'Publicado' })
  @IsString()
  readonly estadoPublicacion: string;

  @ApiProperty({ example: '2016-12-13T06:55:24.698Z' })
  @IsString()
  readonly fechaPublicacion: string;

  @ApiProperty({ example: 'prueba1@gmail.com' })
  @IsString()
  readonly arrendatario: string;

  @ApiProperty({
    example: [
      [0, 1, 2, 3],
      [0, 4, 5, 6],
    ],
  })
  @IsArray()
  readonly fotos: Buffer[];
}
