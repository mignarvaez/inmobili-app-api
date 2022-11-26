import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { EspecificacionesParcial } from './dto/especificaciones-partial.dto';
import { EspecificacionesDto } from './dto/especificaciones.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble, InmuebleDocument } from './schemas/inmueble.schema';

@Injectable()
export class InmueblesService {
  constructor(
    @InjectModel(Inmueble.name)
    private readonly inmuebleModel: Model<InmuebleDocument>,
    private usuariosService: UsuariosService,
  ) {}

  async create(createInmuebleDto: CreateInmuebleDto) {
    if (!(await this.usuariosService.checkEmail(createInmuebleDto.propietario)))
      throw new HttpException(
        `Propietario de email ${createInmuebleDto.propietario} no registrado`,
        HttpStatus.NOT_FOUND,
      );
    const inmuebleCreado = new this.inmuebleModel(createInmuebleDto);
    return inmuebleCreado.save();
  }

  async findAll() {
    return this.inmuebleModel.find().exec();
  }

  async findAllAvailables() {
    return this.inmuebleModel.find({ arrendatario: '' }).exec();
  }

  async findAllUnavailables() {
    return this.inmuebleModel.find({ arrendatario: { $ne: '' } }).exec();
  }

  async findOne(idInmueble: number) {
    return this.inmuebleModel.findOne({ idInmueble: idInmueble }).exec();
  }

  async encontrarPorPropietario(email: string) {
    return this.inmuebleModel.findOne({ propietario: email }).exec();
  }

  async encontrarPorArrendatario(email: string) {
    return this.inmuebleModel.findOne({ arrendatario: email }).exec();
  }

  async findByEspecificacion(
    especificacionesBusqueda: EspecificacionesParcial,
  ) {
    return this.inmuebleModel
      .find({
        $or: [
          { 'especificaciones.ciudad': especificacionesBusqueda.ciudad },
          { 'especificaciones.direccion': especificacionesBusqueda.direccion },
          {
            'especificaciones.tipoInmueble':
              especificacionesBusqueda.tipoInmueble,
          },
          {
            'especificaciones.valorArriendo':
              especificacionesBusqueda.valorArriendo,
          },
          {
            'especificaciones.valorAdmin': especificacionesBusqueda.valorAdmin,
          },
          { 'especificaciones.tamaño': especificacionesBusqueda.tamaño },
          { 'especificaciones.estrato': especificacionesBusqueda.estrato },
          {
            'especificaciones.habitaciones':
              especificacionesBusqueda.habitaciones,
          },
          { 'especificaciones.baños': especificacionesBusqueda.baños },
          {
            'especificaciones.parqueadero':
              especificacionesBusqueda.parqueadero,
          },
        ],
      })
      .exec();
  }

  async update(idInmueble: number, updateInmuebleDto: UpdateInmuebleDto) {
    if (updateInmuebleDto.especificaciones)
      updateInmuebleDto.especificaciones = await this.fixEspecificaciones(
        idInmueble,
        updateInmuebleDto,
      );

    return this.inmuebleModel
      .findOneAndUpdate({ idInmueble: idInmueble }, updateInmuebleDto, {
        new: true, // Devuelve el objeto modificado
      })
      .exec();
  }

  async remove(idInmueble: number) {
    if (!(await this.checkArrendatario(idInmueble)))
      return this.inmuebleModel
        .findOneAndRemove({ idInmueble: idInmueble })
        .exec();
    else
      throw new HttpException(
        `No puede eliminarse una propiedad que está arrendada`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async checkArrendatario(idInmueble: number) {
    return this.inmuebleModel
      .exists({ idInmueble: idInmueble, arrendatario: { $ne: '' } })
      .exec();
  }

  async actualizarArriendo(idInmueble: number, arrendatario: string) {
    this.inmuebleModel
      .findOneAndUpdate(
        { idInmueble: idInmueble },
        { arrendatario: arrendatario },
      )
      .exec();
  }

  private async fixEspecificaciones(
    idInmueble: number,
    updateInmuebleDto: UpdateInmuebleDto,
  ): Promise<EspecificacionesDto> {
    const especificacionesPrevias = await this.inmuebleModel
      .findOne({
        idInmueble: idInmueble,
      })
      .select('especificaciones')
      .lean()
      .exec();
    if (!especificacionesPrevias) {
      throw new HttpException(
        `Propiedad de ID ${idInmueble} no registrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const especificacionesLimpias = especificacionesPrevias.especificaciones;
    Object.entries(especificacionesLimpias).forEach(([key]) => {
      Object.entries(updateInmuebleDto.especificaciones).forEach(
        ([key2, value2]) => {
          if (key === key2) especificacionesLimpias[key] = value2;
        },
      );
    });

    return especificacionesLimpias;
  }
}
