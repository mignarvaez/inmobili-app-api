import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Usuario } from './schemas/usuario.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('usuarios')
@Controller('usuarios')
@UseInterceptors(MongooseClassSerializerInterceptor(Usuario))
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usuariosService.findOne(email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/usuariocompleto/:email')
  obtenerInformacionUsuarioCompleto(@Param('email') email: string) {
    return this.usuariosService.obtenerInformacionUsuarioCompleto(email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(email, updateUsuarioDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usuariosService.remove(email);
  }
}
