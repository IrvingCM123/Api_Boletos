import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogoVehiculosService } from './catalogo_vehiculos.service';
import { CreateCatalogoVehiculoDto } from './dto/create-catalogo_vehiculo.dto';
import { UpdateCatalogoVehiculoDto } from './dto/update-catalogo_vehiculo.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('catalogo-vehiculos')
export class CatalogoVehiculosController {

  constructor(private readonly catalogoVehiculosService: CatalogoVehiculosService) {}

  @Post()
  create(@Body() createCatalogoVehiculoDto: CreateCatalogoVehiculoDto, @ActiveUser() user: User_Interface) {
    return this.catalogoVehiculosService.create(createCatalogoVehiculoDto, user);
  }

  @Get()
  findAll(  @ActiveUser() user: User_Interface) {
    return this.catalogoVehiculosService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoVehiculosService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoVehiculoDto: UpdateCatalogoVehiculoDto, @ActiveUser() user: User_Interface) {
    return this.catalogoVehiculosService.update(+id, updateCatalogoVehiculoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface){
    return this.catalogoVehiculosService.remove(+id, user);
  }
}
