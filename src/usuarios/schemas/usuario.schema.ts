import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop()
  nombre?: string;

  @Prop()
  identificacion?: string;

  @Prop()
  telefono?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
