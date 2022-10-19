import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigurationModule } from './infrastructure/configuration/app-configuration.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { InmueblesModule } from './inmuebles/inmuebles.module';
import { ContratosModule } from './contratos/contratos.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigurationService } from './infrastructure/configuration/app-configuration.service';

@Module({
  // Se importan los modulos a usar en el módulo principal
  imports: [
    AppConfigurationModule,
    UsuariosModule,
    InmueblesModule,
    ContratosModule,
    // Configuración dinamica para mongoose
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
