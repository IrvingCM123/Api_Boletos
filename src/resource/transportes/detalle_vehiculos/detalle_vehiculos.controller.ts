import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleVehiculosService } from './detalle_vehiculos.service';
import { CreateDetalleVehiculoDto } from './dto/create-detalle_vehiculo.dto';
import { UpdateDetalleVehiculoDto } from './dto/update-detalle_vehiculo.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('detalle-vehiculos')
export class DetalleVehiculosController {

  constructor(private readonly detalleVehiculosService: DetalleVehiculosService) {}

  @Post()
  create(@Body() createDetalleVehiculoDto: CreateDetalleVehiculoDto, @ActiveUser() user: User_Interface) {
    return this.detalleVehiculosService.create(createDetalleVehiculoDto, user);
  }

  @Get()
  findAll() {
    return this.detalleVehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.detalleVehiculosService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleVehiculoDto: UpdateDetalleVehiculoDto, @ActiveUser() user: User_Interface) {
    return this.detalleVehiculosService.update(+id, updateDetalleVehiculoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.detalleVehiculosService.remove(+id, user);
  }
}
