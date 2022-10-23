import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { TipoInmueble } from '../constants/tipoInmueble';

export class EspecificacionesDto {
  @ApiProperty({ example: 'Bucaramanga' })
  @IsString()
  ciudad: string;

  @ApiProperty({ example: 'calle 91#39-4' })
  @IsString()
  direccion: string;

  @ApiProperty({ type: String, example: TipoInmueble.APARTAMENTO })
  @IsString()
  tipoInmueble: TipoInmueble;

  @ApiProperty({ example: 1575639 })
  @IsNumber()
  valorArriendo: number;

  @ApiProperty({ example: 175074 })
  @IsNumber()
  @IsOptional()
  valorAdmin?: number;

  @ApiProperty({ example: 73 })
  @IsNumber()
  @IsOptional()
  tamaño?: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsOptional()
  estrato?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsOptional()
  habitaciones?: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  baños?: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  parqueadero?: boolean;
}
