import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InmueblesService } from '../inmuebles/inmuebles.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato, ContratoDocument } from './schemas/contrato.schema';

@Injectable()
export class ContratosService {
  constructor(
    @InjectModel(Contrato.name)
    private readonly contratoModel: Model<ContratoDocument>,
    private inmueblesService: InmueblesService,
    private usuariosService: UsuariosService,
  ) {}

  async arrendar(createContratoDto: CreateContratoDto) {
    if (!(await this.usuariosService.checkEmail(createContratoDto.propietario)))
      throw new HttpException(
        `Propietario de email ${createContratoDto.propietario} no registrado`,
        HttpStatus.NOT_FOUND,
      );
    if (
      !(await this.usuariosService.checkEmail(createContratoDto.arrendatario))
    )
      throw new HttpException(
        `Arrendatario de email ${createContratoDto.arrendatario} no registrado`,
        HttpStatus.NOT_FOUND,
      );
    if (
      await this.inmueblesService.checkArrendatario(
        createContratoDto.idInmueble,
      )
    )
      throw new HttpException(
        `Inmueble de id ${createContratoDto.idInmueble} ya tiene registrado un arrendatario, no puede realizarse el contrato`,
        HttpStatus.NOT_FOUND,
      );
    this.inmueblesService.actualizarArriendo(
      createContratoDto.idInmueble,
      createContratoDto.arrendatario,
    );
    const contratoCreado = new this.contratoModel(createContratoDto);
    return contratoCreado.save();
  }

  async findAll() {
    return this.contratoModel.find().exec();
  }

  async findOne(idContrato: number) {
    return this.contratoModel.findOne({ idContrato: idContrato }).exec();
  }

  async update(idContrato: number, updateContratoDto: UpdateContratoDto) {
    return this.contratoModel
      .findOneAndUpdate({ idContrato: idContrato }, updateContratoDto, {
        new: true, // Devuelve el objeto modificado
      })
      .exec();
  }

  async remove(idContrato: number) {
    return this.contratoModel
      .findOneAndRemove({ idContrato: idContrato })
      .exec();
  }
}
