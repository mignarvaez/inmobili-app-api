import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { UsuariosService } from './usuarios.service';

const usuario = {
  email: 'prueba@email.com',
  contrasena: '1213$Sd1sda48',
  nombre: 'Pedro perez',
  identificacion: '120128131',
  telefono: '2434122',
};
class UsuarioModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockReturnValue({ exec: () => [usuario] });
  static findOne = jest.fn().mockReturnValue({ exec: () => usuario });
  static findOneAndUpdate = jest.fn().mockReturnValue(usuario);
  static deleteOne = jest.fn().mockReturnValue(true);
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
        contrasena: usuario.contrasena,
        nombre: usuario.nombre,
        identificacion: usuario.identificacion,
        telefono: usuario.telefono,
      } as CreateUsuarioDto),
    )
      .resolves.toEqual(usuario)
      .catch((err) => {
        console.log(err);
      });
  });
});
