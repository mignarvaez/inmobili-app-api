import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppConfigurationModule } from 'src/infrastructure/configuration/app-configuration.module';
import { AppConfigurationService } from 'src/infrastructure/configuration/app-configuration.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    AppConfigurationModule,
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: async (appConfigService: AppConfigurationService) => ({
        secret: appConfigService.secretKey,
        signOptions: {
          expiresIn: `${appConfigService.expiration}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
