import { Test, TestingModule } from '@nestjs/testing';
import { ContratosService } from './contratos.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { getModelToken } from '@nestjs/mongoose';
import { Contrato } from './schemas/contrato.schema';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

const moduleMocker = new ModuleMocker(global);

const contrato = {
  idContrato: 2,
  idInmueble: 4,
  fechaContrato: '01-11-2022',
  fechaPublicacion: '17-09-2022',
  propietario: 'usuario1@correo.com',
  arrendatario: 'usuario5@correo.com',
  duracion: 6,
  valorArriendo: 1953332,
  valorAdmin: 84435,
  activo: true,
  fechaTerminacion: '',
};

class ContratoModelMock {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockReturnValue({ exec: () => [contrato] });
  static findOne = jest.fn().mockReturnValue({ exec: () => contrato });
  static findOneAndUpdate = jest.fn().mockReturnValue({ exec: () => contrato });
  static findOneAndRemove = jest.fn().mockReturnValue({ exec: () => contrato });
  static exists = jest.fn().mockReturnValue({ exec: () => true });
}

const mockUsuariosService = {
  checkEmail: () => true,
};

describe('ContratosService', () => {
  let service: ContratosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratosService,
        {
          provide: getModelToken(Contrato.name),
          useValue: ContratoModelMock,
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

    service = module.get<ContratosService>(ContratosService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deberia arrendar un inmueble y retornar el contrato', async () => {
    expect(await service.arrendar(contrato as CreateContratoDto)).toStrictEqual(
      contrato,
    );
  });

  it('deberia retornar todos los contratos', async () => {
    expect(await service.findAll()).toStrictEqual([contrato]);
  });

  it('deberia retornar contrato según id', async () => {
    expect(await service.findOne(2)).toBe(contrato);
  });

  it('deberia actualizar y retornar el contrato actualizado', async () => {
    expect(
      await service.update(2, {
        valorArriendo: 1953332,
        valorAdmin: 84435,
      } as UpdateContratoDto),
    ).toStrictEqual(contrato);
  });

  it('deberia eliminar y retornar el contrato borrado', async () => {
    expect(await service.remove(2)).toStrictEqual(contrato);
  });
});
