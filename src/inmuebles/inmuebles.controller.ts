import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';

@Controller('inmuebles')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inmueblesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInmuebleDto: UpdateInmuebleDto) {
    return this.inmueblesService.update(+id, updateInmuebleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inmueblesService.remove(+id);
  }
}
