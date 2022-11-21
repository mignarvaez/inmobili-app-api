import { Test, TestingModule } from '@nestjs/testing';
import { InmueblesController } from './inmuebles.controller';
import { InmueblesService } from './inmuebles.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { EspecificacionesParcial } from './dto/especificaciones-partial.dto';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';

const moduleMocker = new ModuleMocker(global);

const inmueble = {
  propietario: 'usuario1@correo.com',
  titulo: 'Inmueble3',
  descripcion: 'Arriendo Inmueble grande',
  especificaciones: {
    ciudad: 'Cali',
    direccion: 'calle 32#33-45',
    tipoInmueble: 'Apartamento',
    valorArriendo: 1569404,
    valorAdmin: 178529,
    tamaño: 65,
    estrato: 3,
    habitaciones: 4,
    baños: 2,
    parqueadero: false,
  },
  estadoPublicacion: 'Publicado',
  fechaPublicacion: '28-10-2022',
  arrendatario: 'usuario3@correo.com',
  fotos: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ],
  idInmueble: 1,
};

const mockInmuebleService = {
  findAll: () => [inmueble],
  findAllAvailables: () => [inmueble],
  findAllUnavailables: () => [inmueble],
  findOne: () => inmueble,
  encontrarPorPropietario: () => inmueble,
  encontrarPorArrendatario: () => inmueble,
  findByEspecificacion: () => [inmueble],
  create: () => inmueble,
  update: () => inmueble,
  remove: () => inmueble,
};

describe('InmueblesController', () => {
  let controller: InmueblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InmueblesController],
      providers: [InmueblesService],
    })
      .overrideProvider(InmueblesService)
      .useValue(mockInmuebleService)
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();
    controller = module.get<InmueblesController>(InmueblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deberia retornar una lista de inmuebles', async () => {
    expect(await controller.findAll()).toStrictEqual([inmueble]);
  });

  it('deberia retornar un inmueble', async () => {
    expect(await controller.findOne(inmueble.idInmueble)).toBe(inmueble);
  });

  it('deberia retornar todos los inmuebles disponibles', async () => {
    expect(await controller.findAllAvailables()).toStrictEqual([inmueble]);
  });

  it('deberia retornar todos los inmuebles no disponibles', async () => {
    expect(await controller.findAllUnavailables()).toStrictEqual([inmueble]);
  });

  it('deberia retornar inmueble según id', async () => {
    expect(await controller.findOne(1)).toBe(inmueble);
  });

  it('deberia retornar inmueble según propietario', async () => {
    expect(
      await controller.encontrarPorPropietario('usuario1@correo.com'),
    ).toBe(inmueble);
  });

  it('deberia retornar inmueble según arrendatario', async () => {
    expect(
      await controller.encontrarPorArrendatario('usuario3@correo.com'),
    ).toBe(inmueble);
  });

  it('deberia retornar inmueble según especificacion', async () => {
    expect(
      await controller.findByEspecificacion({
        baños: 2,
        parqueadero: false,
      } as EspecificacionesParcial),
    ).toStrictEqual([inmueble]);
  });

  it('deberia crear un inmueble y retornarlo', async () => {
    expect(
      await controller.create({
        propietario: inmueble.propietario,
        titulo: inmueble.titulo,
        descripcion: inmueble.descripcion,
        especificaciones: inmueble.especificaciones,
        estadoPublicacion: inmueble.estadoPublicacion,
        fechaPublicacion: inmueble.fechaPublicacion,
        arrendatario: inmueble.arrendatario,
        fotos: inmueble.fotos,
      } as CreateInmuebleDto),
    ).toStrictEqual(inmueble);
  });

  it('deberia actualizar y retornar el inmueble actualizado', async () => {
    expect(
      await controller.update(1, {
        baños: 2,
        parqueadero: false,
      } as UpdateInmuebleDto),
    ).toStrictEqual(inmueble);
  });

  it('deberia eliminar y retornar el inmueble borrado', async () => {
    expect(await controller.remove(1)).toStrictEqual(inmueble);
  });
});
