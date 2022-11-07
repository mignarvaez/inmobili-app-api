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
  UseGuards,
} from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { Inmueble } from './schemas/inmueble.schema';
import { EspecificacionesParcial } from './dto/especificaciones-partial.dto';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('inmuebles')
@Controller('inmuebles')
@UseInterceptors(MongooseClassSerializerInterceptor(Inmueble))
export class InmueblesController {
  constructor(private readonly inmueblesService: InmueblesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInmuebleDto: CreateInmuebleDto) {
    return this.inmueblesService.create(createInmuebleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.inmueblesService.findAll();
  }

  @Get('/availables')
  findAllAvailables() {
    return this.inmueblesService.findAllAvailables();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/unavailables')
  findAllUnavailables() {
    return this.inmueblesService.findAllUnavailables();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('propietario/:email')
  encontrarPorPropietario(@Param('email') email: string) {
    return this.inmueblesService.encontrarPorPropietario(email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('arrendatario/:email')
  encontrarPorArrendatario(@Param('email') email: string) {
    return this.inmueblesService.encontrarPorArrendatario(email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':idInmueble')
  update(
    @Param('idInmueble', ParseIntPipe) idInmueble: number,
    @Body() updateInmuebleDto: UpdateInmuebleDto,
  ) {
    return this.inmueblesService.update(+idInmueble, updateInmuebleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':idInmueble')
  remove(@Param('idInmueble', ParseIntPipe) idInmueble: number) {
    return this.inmueblesService.remove(+idInmueble);
  }
}
