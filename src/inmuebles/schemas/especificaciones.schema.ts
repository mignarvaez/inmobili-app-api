import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Especificaciones {
  @Prop({ required: true })
  ciudad: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true })
  tipoInmueble: string;

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
