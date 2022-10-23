import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  contrasena: string;

  @Prop()
  nombre?: string;

  @Prop()
  identificacion?: string;

  @Prop()
  telefono?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
