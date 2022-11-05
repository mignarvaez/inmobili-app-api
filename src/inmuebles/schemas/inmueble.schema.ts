import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Especificaciones } from './especificaciones.schema';
import { Usuario } from 'src/usuarios/schemas/usuario.schema';

export type InmuebleDocument = Inmueble & Document;

@Schema({ versionKey: false })
export class Inmueble {
  @Prop({ unique: true })
  idInmueble: number;

  @Prop({ required: true, type: String, ref: Usuario.name, index: true })
  propietario: Usuario;

  @Prop({ required: true })
  titulo: string;

  @Prop()
  descripcion?: string;

  @Prop({ required: true, type: Especificaciones })
  especificaciones: Especificaciones;

  @Prop({ required: true })
  estadoPublicacion: string;

  @Prop({ required: true })
  fechaPublicacion: string;

  @Prop({ type: String, ref: 'Usuario', index: true })
  arrendatario?: Usuario;

  @Prop({
    type: [String],
    validate: {
      validator: (v) => {
        return v.length <= 16;
      },
      message: 'La lista de fotos no puede ser superior a 16',
    },
  })
  fotos?: string[];
}
export const InmuebleSchema = SchemaFactory.createForClass(Inmueble);
