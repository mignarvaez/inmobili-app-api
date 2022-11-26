import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateContratoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly idInmueble: number;

  @ApiProperty({ example: '01-11-2022' })
  @IsString()
  readonly fechaContrato: string;

  @ApiProperty({ example: '28-10-2022' })
  @IsString()
  readonly fechaPublicacion: string;

  @ApiProperty({ example: 'prueba@email.com' })
  @IsEmail()
  readonly propietario: string;

  @ApiProperty({ example: 'prueba1@email.com' })
  @IsEmail()
  readonly arrendatario: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  readonly duracion: number;

  @ApiProperty({ example: 800000 })
  @IsNumber()
  readonly valorArriendo: number;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  @IsOptional()
  readonly valorAdmin?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  fechaTerminacion?: string;
}
