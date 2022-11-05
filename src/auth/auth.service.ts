import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppConfigurationService } from 'src/infrastructure/configuration/app-configuration.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly appConfigurationService: AppConfigurationService,
  ) {}

  public async autenticarUsuario(email: string, plainTextContrasena: string) {
    try {
      const usuario = await this.usuariosService.findOne(email);
      await this.verificarContrasena(plainTextContrasena, usuario.contrasena);
      return usuario;
    } catch (error) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verificarContrasena(
    plainTextContrasena: string,
    contrasena: string,
  ) {
    const passworCoincide = await bcrypt.compare(
      plainTextContrasena,
      contrasena,
    );
    if (!passworCoincide) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(usuario: any) {
    const payload = { sub: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
      status: HttpStatus.OK,
    };
  }
}
