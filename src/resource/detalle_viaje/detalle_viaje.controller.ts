import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleViajeService } from './detalle_viaje.service';
import { CreateDetalleViajeDto } from './dto/create-detalle_viaje.dto';
import { UpdateDetalleViajeDto } from './dto/update-detalle_viaje.dto';

@Controller('detalle-viaje')
export class DetalleViajeController {
  constructor(private readonly detalleViajeService: DetalleViajeService) {}

  @Post()
  create(@Body() createDetalleViajeDto: CreateDetalleViajeDto) {
    return this.detalleViajeService.create(createDetalleViajeDto);
  }

  @Get()
  findAll() {
    return this.detalleViajeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleViajeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleViajeDto: UpdateDetalleViajeDto) {
    return this.detalleViajeService.update(+id, updateDetalleViajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleViajeService.remove(+id);
  }
}
