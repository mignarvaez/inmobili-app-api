import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './schemas/inmueble.schema';
import { EspecificacionesParcial } from './dto/especificaciones-partial.dto';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';

@Controller('inmuebles')
@UseInterceptors(MongooseClassSerializerInterceptor(Inmueble))
export class InmueblesController {
  constructor(private readonly inmueblesService: InmueblesService) {}

  @Post()
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmueblesService.create(createInmuebleDto);
  }

  @Get()
  findAll() {
    return this.inmueblesService.findAll();
  }

  @Get('/availables')
  findAllAvailables() {
    return this.inmueblesService.findAllAvailables();
  }

  @Get('/unavailables')
  findAllUnavailables() {
    return this.inmueblesService.findAllUnavailables();
  }

  @Post('/especificacion')
  findByEspecificacion(
    @Body() especificacionesBusquedaDto: EspecificacionesParcial,
  ) {
    return this.inmueblesService.findByEspecificacion(
      especificacionesBusquedaDto,
    );
  }

  @Get(':idInmueble')
  findOne(@Param('idInmueble', ParseIntPipe) idInmueble: number) {
    return this.inmueblesService.findOne(+idInmueble);
  }

  @Patch(':idInmueble')
  update(
    @Param('idInmueble', ParseIntPipe) idInmueble: number,
    @Body() updateInmuebleDto: UpdateInmuebleDto,
  ) {
    return this.inmueblesService.update(+idInmueble, updateInmuebleDto);
  }

  @Delete(':idInmueble')
  remove(@Param('idInmueble', ParseIntPipe) idInmueble: number) {
    return this.inmueblesService.remove(+idInmueble);
  }
}
