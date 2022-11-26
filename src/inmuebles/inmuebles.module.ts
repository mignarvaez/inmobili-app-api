import { Module } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Inmueble, InmuebleSchema } from './schemas/inmueble.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    UsuariosModule,
    MongooseModule.forFeatureAsync([
      {
        name: Inmueble.name,
        useFactory: (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = InmuebleSchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'idInmueble',
            start_seq: 1,
          });

          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [InmueblesController],
  providers: [InmueblesService],
  exports: [InmueblesService],
})
export class InmueblesModule {}
