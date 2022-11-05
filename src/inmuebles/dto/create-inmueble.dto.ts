import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsOptional()
  readonly descripcion?: string;

  @ApiProperty({ type: EspecificacionesDto })
  @IsObject()
  especificaciones: EspecificacionesDto;

  @ApiProperty({ example: 'Publicado' })
  @IsString()
  readonly estadoPublicacion: string;

  @ApiProperty({ example: '26-10-2022' })
  @IsString()
  readonly fechaPublicacion: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  readonly arrendatario?: string;

  @ApiProperty({
    example: ['', ''],
  })
  @IsArray()
  @IsOptional()
  readonly fotos?: string[];
}
