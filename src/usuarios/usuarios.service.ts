import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly UsuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    //Validar existente
    const usuarioCreado = new this.UsuarioModel(createUsuarioDto);
    return usuarioCreado.save();
  }

  async findAll() {
    return this.UsuarioModel.find().exec();
  }

  async findOne(email: string) {
    return this.UsuarioModel.findOne({ email: email }).exec();
  }

  async update(email: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.UsuarioModel.findOneAndUpdate(
      { email: email },
      updateUsuarioDto,
      {
        new: true, // Devuelve el objeto modificado
      },
    );
  }

  async remove(email: string) {
    return this.UsuarioModel.findOneAndRemove({ email: email }).exec();
  }
}
