import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from 'src/usuarios/schemas/usuario.schema';
import { Inmueble } from 'src/inmuebles/schemas/inmueble.schema';

export type ContratoDocument = Contrato & Document;

@Schema()
export class Contrato {
  @Prop({ required: true, index: true, unique: true })
  idContrato: number;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inmueble',
  })
  inmueble: Inmueble;

  @Prop({ required: true })
  fechaContrato: Date;

  @Prop({ required: true })
  fechaPublicacion: Date;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  })
  propietario: Usuario;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  })
  arrendatario: Usuario;

  @Prop({ required: true })
  duracion: number;

  @Prop({ required: true })
  valorArriendo: number;

  @Prop()
  valorAdmin?: number;

  @Prop({ default: true })
  activo: boolean;

  @Prop()
  fechaTerminacion?: Date;
}

export const ContratoSchema = SchemaFactory.createForClass(Contrato);
