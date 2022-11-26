import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'prueba@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  readonly contrasena: string;
}
