import { Prop, Schema } from '@nestjs/mongoose';
import { TipoInmueble } from '../constants/tipoInmueble';

@Schema({ _id: false })
export class Especificaciones {
  @Prop({ required: true })
  ciudad: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true, enum: TipoInmueble })
  tipoInmueble: TipoInmueble;

  @Prop({ required: true })
  valorArriendo: number;

  @Prop()
  valorAdmin?: number;

  @Prop()
  tamaño?: number;

  @Prop()
  estrato?: number;

  @Prop()
  habitaciones?: number;

  @Prop()
  baños?: number;

  @Prop()
  parqueadero?: boolean;
}
