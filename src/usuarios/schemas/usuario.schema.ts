import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

export type UsuarioDocument = Usuario & Document;

@Schema({ versionKey: false })
export class Usuario {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  nombre?: string;

  @Prop()
  identificacion?: string;

  @Prop()
  telefono?: string;

  @Prop({ required: true })
  @Exclude()
  contrasena: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
