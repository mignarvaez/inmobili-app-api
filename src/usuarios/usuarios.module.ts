import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import {
  Usuario,
  UsuarioSchema,
  UsuarioCompleto,
  UsuarioCompletoSchema,
} from './schemas/usuario.schema';

import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    MongooseModule.forFeature([
      { name: UsuarioCompleto.name, schema: UsuarioCompletoSchema },
    ]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {
  @InjectConnection() private readonly connection: Connection;
  async onModuleInit(): Promise<void> {
    const collections = await this.connection.db.listCollections().toArray();
    if (
      collections.every((collection) => collection.name !== 'usuarioCompleto')
    ) {
      await this.connection.db.createCollection('usuarioCompleto', {
        viewOn: 'logs',
        pipeline: [
          {
            $lookup: {
              as: 'misInmuebles',
              from: 'inmuebles',
              pipeline: [
                {
                  $lookup: {
                    from: 'usuarios',
                    localField: 'arrendatario',
                    foreignField: 'email',
                    as: 'arrendatario',
                  },
                },
                {
                  $lookup: {
                    as: 'contratos',
                    from: 'contratos',
                    pipeline: [
                      {
                        $lookup: {
                          from: 'usuarios',
                          localField: 'arrendatario',
                          foreignField: 'email',
                          as: 'arrendatario',
                        },
                      },
                    ],
                    localField: 'idInmueble',
                    foreignField: 'idInmueble',
                  },
                },
              ],
              localField: 'email',
              foreignField: 'propietario',
            },
          },
          {
            $lookup: {
              foreignField: 'arrendatario',
              as: 'misArriendos',
              from: 'inmuebles',
              pipeline: [
                {
                  $lookup: {
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              {
                                $eq: ['$idInmueble', '$$imueb'],
                              },
                              {
                                $eq: ['$arrendatario', '$$arrendat'],
                              },
                            ],
                          },
                        },
                      },
                    ],
                    localField: 'idInmueble',
                    foreignField: 'idInmueble',
                    as: 'contratos',
                    from: 'contratos',
                    let: {
                      imueb: '$idInmueble',
                      arrendat: '$arrendatario',
                    },
                  },
                },
                {
                  $lookup: {
                    from: 'usuarios',
                    localField: 'propietario',
                    foreignField: 'email',
                    as: 'propietario',
                  },
                },
              ],
              localField: 'email',
            },
          },
          {
            $unset: [
              'contrasena',
              'misInmuebles.propietario',
              'misInmuebles.arrendatario.contrasena',
              'misInmuebles.contratos.propietario',
              'misInmuebles.contratos.arrendatario.contrasena',
              'misArriendos.propietario.contrasena',
              'misArriendos.arrendatario',
              'misArriendos.contratos.arrendatario',
              'misArriendos.contratos.propietario',
            ],
          },
        ],
      });
    }
  }
}
