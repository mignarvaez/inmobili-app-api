import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'contrasena',
    });
  }

  async validate(email: string, contrasena: string): Promise<any> {
    const usuario = await this.authService.autenticarUsuario(email, contrasena);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
