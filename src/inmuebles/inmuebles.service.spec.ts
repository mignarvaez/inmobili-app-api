import { Test, TestingModule } from '@nestjs/testing';
import { InmueblesService } from './inmuebles.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { getModelToken } from '@nestjs/mongoose';
import { Inmueble } from './schemas/inmueble.schema';
import { EspecificacionesParcial } from './dto/especificaciones-partial.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

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
};
class InmuebleModelMock {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockReturnValue({ exec: () => [inmueble] });
  static findOne = jest.fn().mockReturnValue({ exec: () => inmueble });
  static findOneAndUpdate = jest.fn().mockReturnValue({ exec: () => inmueble });
  static findOneAndRemove = jest.fn().mockReturnValue({ exec: () => inmueble });
  static exists = jest.fn().mockReturnValue({ exec: () => true });
}
const mockUsuariosService = {
  checkEmail: () => true,
};

describe('InmueblesService', () => {
  let service: InmueblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InmueblesService,
        {
          provide: getModelToken(Inmueble.name),
          useValue: InmuebleModelMock,
        },
        UsuariosService,
      ],
    })
      .overrideProvider(UsuariosService)
      .useValue(mockUsuariosService)
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

    service = module.get<InmueblesService>(InmueblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deberia retornar todos los inmuebles', async () => {
    expect(await service.findAll()).toStrictEqual([inmueble]);
  });

  it('deberia retornar todos los inmuebles disponibles', async () => {
    expect(await service.findAllAvailables()).toStrictEqual([inmueble]);
  });

  it('deberia retornar todos los inmuebles no disponibles', async () => {
    expect(await service.findAllUnavailables()).toStrictEqual([inmueble]);
  });

  it('deberia retornar inmueble según id', async () => {
    expect(await service.findOne(1)).toBe(inmueble);
  });

  it('deberia retornar inmueble según propietario', async () => {
    expect(await service.encontrarPorPropietario('usuario1@correo.com')).toBe(
      inmueble,
    );
  });

  it('deberia retornar inmueble según arrendatario', async () => {
    expect(await service.encontrarPorArrendatario('usuario3@correo.com')).toBe(
      inmueble,
    );
  });

  it('deberia retornar inmueble según especificacion', async () => {
    expect(
      await service.findByEspecificacion({
        baños: 2,
        parqueadero: false,
      } as EspecificacionesParcial),
    ).toStrictEqual([inmueble]);
  });

  it('deberia crear un inmueble y retornarlo', async () => {
    expect(
      await service.create({
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
      await service.update(1, {
        baños: 2,
        parqueadero: false,
      } as UpdateInmuebleDto),
    ).toStrictEqual(inmueble);
  });

  it('deberia eliminar y retornar el inmueble borrado', async () => {
    jest
      .spyOn(InmuebleModelMock, 'exists')
      .mockReturnValue({ exec: () => false });
    expect(await service.remove(1)).toStrictEqual(inmueble);
  });
});
