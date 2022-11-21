import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from './schemas/contrato.schema';

@ApiTags('contratos')
@ApiBearerAuth()
@Controller('contratos')
@UseGuards(JwtAuthGuard)
@UseInterceptors(MongooseClassSerializerInterceptor(Contrato))
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  arrendar(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.arrendar(createContratoDto);
  }

  @Get()
  findAll() {
    return this.contratosService.findAll();
  }

  @Get(':idContrato')
  findOne(@Param('idContrato', ParseIntPipe) idContrato: number) {
    return this.contratosService.findOne(+idContrato);
  }

  @Patch(':idContrato')
  update(
    @Param(':idContrato', ParseIntPipe) idContrato: number,
    @Body() updateContratoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(+idContrato, updateContratoDto);
  }

  @Delete(':idContrato')
  remove(@Param(':idContrato', ParseIntPipe) idContrato: number) {
    return this.contratosService.remove(+idContrato);
  }
}
