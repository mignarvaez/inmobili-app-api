import { PartialType } from '@nestjs/swagger';
import { EspecificacionesDto } from './especificaciones.dto';

export class EspecificacionesParcial extends PartialType(EspecificacionesDto) {}
