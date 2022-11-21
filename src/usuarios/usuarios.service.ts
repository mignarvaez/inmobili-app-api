import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {
  Usuario,
  UsuarioCompleto,
  UsuarioCompletoDocument,
  UsuarioDocument,
} from './schemas/usuario.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  SALT_OR_ROUNDS = 10;
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
    @InjectModel(UsuarioCompleto.name)
    private readonly usuarioCompletoModel: Model<UsuarioCompletoDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    if (await this.checkEmail(createUsuarioDto.email))
      throw new HttpException(
        `Email: ${createUsuarioDto.email} ya registrado`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const hashedContrasena = await bcrypt.hash(
      createUsuarioDto.contrasena,
      this.SALT_OR_ROUNDS,
    );
    const usuarioCreado = new this.usuarioModel({
      ...createUsuarioDto,
      contrasena: hashedContrasena,
    });
    return usuarioCreado.save();
  }

  async findAll() {
    return this.usuarioModel.find().exec();
  }

  async findOne(email: string) {
    return this.usuarioModel.findOne({ email: email }).exec();
  }

  async obtenerInformacionUsuarioCompleto(email: string) {
    if (!(await this.checkEmail(email)))
      throw new HttpException(
        `Usuario con email: ${email} no se encuentra registrado`,
        HttpStatus.NOT_FOUND,
      );
    return this.usuarioCompletoModel.findOne({ email: email }).exec();
  }

  async update(email: string, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.contrasena) {
      const hashedContrasena = await bcrypt.hash(
        updateUsuarioDto.contrasena,
        this.SALT_OR_ROUNDS,
      );
      const usuarioEditado = {
        ...updateUsuarioDto,
        contrasena: hashedContrasena,
      };
      return this.usuarioModel
        .findOneAndUpdate({ email: email }, usuarioEditado, {
          new: true, // Devuelve el objeto modificado
        })
        .exec();
    } else {
      return this.usuarioModel
        .findOneAndUpdate({ email: email }, updateUsuarioDto, {
          new: true, // Devuelve el objeto modificado
        })
        .exec();
    }
  }

  async remove(email: string) {
    return this.usuarioModel.findOneAndRemove({ email: email }).exec();
  }

  async checkEmail(email: string) {
    return this.usuarioModel.exists({ email: email }).exec();
  }
}
