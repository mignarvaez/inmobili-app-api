import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Contrato, ContratoSchema } from './schemas/contrato.schema';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { InmueblesModule } from 'src/inmuebles/inmuebles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    InmueblesModule,
    UsuariosModule,
    MongooseModule.forFeatureAsync([
      {
        name: Contrato.name,
        useFactory: (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = ContratoSchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'idContrato',
            start_seq: 1,
          });

          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [ContratosController],
  providers: [ContratosService],
})
export class ContratosModule {}
