import { Module } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inmueble, InmuebleSchema } from './schemas/inmueble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inmueble.name, schema: InmuebleSchema },
    ]),
  ],
  controllers: [InmueblesController],
  providers: [InmueblesService],
})
export class InmueblesModule {}
