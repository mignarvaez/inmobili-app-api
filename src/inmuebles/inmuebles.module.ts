import { Module } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';

@Module({
  controllers: [InmueblesController],
  providers: [InmueblesService]
})
export class InmueblesModule {}
