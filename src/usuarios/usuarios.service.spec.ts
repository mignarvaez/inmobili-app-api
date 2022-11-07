import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario, UsuarioCompleto } from './schemas/usuario.schema';
import { UsuariosService } from './usuarios.service';

const usuario = {
  email: 'prueba@email.com',
  contrasena: '1234',
  nombre: 'Pedro perez',
  identificacion: '120128131',
  telefono: '2434122',
};
const usuarioActualizado = {
  email: 'prueba@email.com',
  contrasena: '1234',
  nombre: 'Juan Alvarez',
  identificacion: '120128131',
  telefono: '2434122',
};
class UsuarioModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockReturnValue({ exec: () => [usuario] });
  static findOne = jest.fn().mockReturnValue({ exec: () => usuario });
  static findOneAndUpdate = jest
    .fn()
    .mockReturnValue({ exec: () => usuarioActualizado });
  static findOneAndRemove = jest.fn().mockReturnValue({ exec: () => usuario });
  static exists = jest.fn().mockReturnValue({ exec: () => false });
}
class UsuarioCompletoModel {
  static findOne = jest.fn().mockReturnValue({ exec: () => usuario });
}

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario.name),
          useValue: UsuarioModel,
        },
        {
          provide: getModelToken(UsuarioCompleto.name),
          useValue: UsuarioCompletoModel,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('deberia estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deberia retornar todos los usuarios', () => {
    expect(service.findAll())
      .resolves.toEqual([usuario])
      .catch((err) => {
        console.log(err);
      });
  });

  it('deberia retornar un usuario', () => {
    expect(service.findOne(usuario.email))
      .resolves.toEqual(usuario)
      .catch((err) => {
        console.log(err);
      });
  });

  it('deberia crear un nuevo usuario y guardarlo', () => {
    expect(
      service.create({
        email: usuario.email,
        nombre: usuario.nombre,
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
        contrasena: usuario.contrasena,
      } as CreateUsuarioDto),
    )
      .resolves.toEqual({ ...usuario, contrasena: expect.anything() })
      .catch((err) => {
        console.log(err);
      });
  });

  it('deberia actualizar un usuario', () => {
    expect(
      service.update('prueba@email.com', {
        nombre: 'Juan Alvarez',
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
        contrasena: usuario.contrasena,
      } as UpdateUsuarioDto),
    )
      .resolves.toEqual({
        ...usuarioActualizado,
        contrasena: expect.anything(),
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('deberia eliminar un usuario', () => {
    expect(service.remove('prueba@email.com'))
      .resolves.toEqual(usuario)
      .catch((err) => {
        console.log(err);
      });
  });

  it('no deberia existir un usuario con el email registrado', () => {
    expect(service.checkEmail('prueba@email.com'))
      .resolves.toEqual(false)
      .catch((err) => {
        console.log(err);
      });
  });

  it('deberia buscar información de usuario completo según email registrado', () => {
    jest.spyOn(UsuarioModel, 'exists').mockImplementation(() => true);
    expect(service.obtenerInformacionUsuarioCompleto('prueba@email.com'))
      .resolves.toEqual(usuario)
      .catch((err) => {
        console.log(err);
      });
  });
});
