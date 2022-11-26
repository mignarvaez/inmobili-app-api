import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

const moduleMocker = new ModuleMocker(global);

describe('UsuariosController', () => {
  const usuario = {
    email: 'prueba@email.com',
    contrasena: '1234',
    nombre: 'Pedro perez',
    identificacion: '120128131',
    telefono: '2434122',
  };
  const mockUsuariosService = {
    findAll: () => [usuario],
    findOne: () => usuario,
    create: () => usuario,
    update: () => usuario,
    remove: () => usuario,
    obtenerInformacionUsuarioCompleto: () => usuario,
  };

  let controller: UsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [UsuariosService],
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
    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('deberia estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deberia retornar una lista de usuarios', async () => {
    expect(await controller.findAll()).toStrictEqual([usuario]);
  });

  it('deberia retornar un usuario', async () => {
    expect(await controller.findOne(usuario.email)).toBe(usuario);
  });

  it('deberia retornar un usuario creado', async () => {
    expect(
      await controller.create({
        email: usuario.email,
        nombre: usuario.nombre,
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
        contrasena: usuario.contrasena,
      } as CreateUsuarioDto),
    ).toBe(usuario);
  });

  it('deberia retornar un usuario actualizado', async () => {
    expect(
      await controller.create({
        email: usuario.email,
        nombre: usuario.nombre,
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
        contrasena: usuario.contrasena,
      } as CreateUsuarioDto),
    ).toBe(usuario);
  });

  it('deberia retornar el usuario eliminado', async () => {
    expect(await controller.remove(usuario.email)).toBe(usuario);
  });

  it('deberia retornar información completa del usuario', async () => {
    expect(
      await controller.obtenerInformacionUsuarioCompleto(usuario.email),
    ).toBe(usuario);
  });
});
