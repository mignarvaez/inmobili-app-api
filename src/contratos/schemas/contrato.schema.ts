import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from 'src/usuarios/schemas/usuario.schema';
import { Inmueble } from 'src/inmuebles/schemas/inmueble.schema';

export type ContratoDocument = Contrato & Document;

@Schema({ versionKey: false })
export class Contrato {
  @Prop({ unique: true })
  idContrato: number;

  @Prop({ required: true, index: true, type: Number, ref: Inmueble.name })
  idInmueble: Inmueble;

  @Prop({ required: true })
  fechaContrato: string;

  @Prop({ required: true })
  fechaPublicacion: string;

  @Prop({ required: true, index: true, type: String, ref: Usuario.name })
  propietario: Usuario;

  @Prop({ required: true, index: true, type: String, ref: Usuario.name })
  arrendatario: Usuario;

  @Prop({ required: true })
  duracion: number;

  @Prop({ required: true })
  valorArriendo: number;

  @Prop()
  valorAdmin?: number;

  @Prop({ default: true })
  activo?: boolean;

  @Prop()
  fechaTerminacion?: string;
}

export const ContratoSchema = SchemaFactory.createForClass(Contrato);
