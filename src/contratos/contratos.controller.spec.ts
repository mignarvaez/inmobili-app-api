import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { CreateContratoDto } from './dto/create-contrato.dto';

const moduleMocker = new ModuleMocker(global);

describe('ContratosController', () => {
  let controller: ContratosController;

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

  const mockContratoService = {
    findAll: () => [contrato],
    findOne: () => contrato,
    arrendar: () => contrato,
    update: () => contrato,
    remove: () => contrato,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
      providers: [ContratosService],
    })
      .overrideProvider(ContratosService)
      .useValue(mockContratoService)
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
    controller = module.get<ContratosController>(ContratosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deberia arrendar un inmueble y retornar el contrato', async () => {
    expect(
      await controller.arrendar(contrato as CreateContratoDto),
    ).toStrictEqual(contrato);
  });

  it('deberia retornar una lista de contratos', async () => {
    expect(await controller.findAll()).toStrictEqual([contrato]);
  });

  it('deberia retornar un inmueble', async () => {
    expect(await controller.findOne(contrato.idContrato)).toBe(contrato);
  });

  it('deberia actualizar y retornar el contrato actualizado', async () => {
    expect(
      await controller.update(2, {
        valorArriendo: 1953332,
        valorAdmin: 84435,
      } as UpdateContratoDto),
    ).toStrictEqual(contrato);
  });

  it('deberia eliminar y retornar el contrato borrado', async () => {
    expect(await controller.remove(2)).toStrictEqual(contrato);
  });
});
