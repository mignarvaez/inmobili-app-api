import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    if (await this.checkEmail(createUsuarioDto.email))
      throw new HttpException(
        `Email: ${createUsuarioDto.email} ya registrado`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const usuarioCreado = new this.usuarioModel(createUsuarioDto);
    return usuarioCreado.save();
  }

  async findAll() {
    return this.usuarioModel.find().exec();
  }

  async findOne(email: string) {
    return this.usuarioModel.findOne({ email: email }).exec();
  }

  async update(email: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioModel
      .findOneAndUpdate({ email: email }, updateUsuarioDto, {
        new: true, // Devuelve el objeto modificado
      })
      .exec();
  }

  async remove(email: string) {
    return this.usuarioModel.findOneAndRemove({ email: email }).exec();
  }

  async checkEmail(email: string) {
    return this.usuarioModel.exists({ email: email }).exec();
  }
}
