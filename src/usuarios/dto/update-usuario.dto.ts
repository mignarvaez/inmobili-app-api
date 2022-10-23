import { OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends OmitType(CreateUsuarioDto, [
  'email',
] as const) {}
