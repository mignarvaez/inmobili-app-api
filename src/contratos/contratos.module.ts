import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contrato, ContratoSchema } from './schemas/contrato.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contrato.name, schema: ContratoSchema },
    ]),
  ],
  controllers: [ContratosController],
  providers: [ContratosService],
})
export class ContratosModule {}
