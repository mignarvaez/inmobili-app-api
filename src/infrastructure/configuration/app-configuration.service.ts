/**
 * Servicio encargado de cargar la configuración de la aplicación
 */
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigurationService {
  private readonly _connectionString!: string;
  private readonly _secretKey!: string;
  private readonly _expiration!: number;

  get connectionString(): string {
    return this._connectionString;
  }

  get secretKey(): string {
    return this._secretKey;
  }

  get expiration(): number {
    return this._expiration;
  }

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFromEnvFile();
    this._secretKey = this._getSecretKeyFromEnvFile();
    this._expiration = this._getExpiration();
  }

  private _getConnectionStringFromEnvFile(): string {
    const connectionString = this._configService.get<string>('MONGODB_DB_URI');
    if (!connectionString) {
      throw new Error('No existe un string de conección en el archivo .env.');
    }
    return connectionString;
  }

  private _getSecretKeyFromEnvFile(): string {
    const secretKey = this._configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      throw new Error(
        'No existe un string secreto para JWT en el archivo.env.',
      );
    }
    return secretKey;
  }

  private _getExpiration(): number {
    const expiration = this._configService.get<number>('JWT_EXPIRATION_TIME');
    if (!expiration) {
      throw new Error(
        'No existe un numero determinado de tiempo de expiración del JWT TOKEN en el archivo .env.',
      );
    }
    return expiration;
  }
}
