import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['email'] as const),
) {}
