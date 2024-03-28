import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosEmergenciaService } from './datos_emergencia.service';
import { CreateDatosEmergenciaDto } from './dto/create-datos_emergencia.dto';
import { UpdateDatosEmergenciaDto } from './dto/update-datos_emergencia.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('datos-emergencia')
export class DatosEmergenciaController {
  constructor(private readonly datosEmergenciaService: DatosEmergenciaService) {}

  @Post()
  create(@Body() createDatosEmergenciaDto: CreateDatosEmergenciaDto, @ActiveUser() user: User_Interface) {
    return this.datosEmergenciaService.create(createDatosEmergenciaDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.datosEmergenciaService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.datosEmergenciaService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosEmergenciaDto: UpdateDatosEmergenciaDto, @ActiveUser() user: User_Interface) {
    return this.datosEmergenciaService.update(+id, updateDatosEmergenciaDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.datosEmergenciaService.remove(+id, user);
  }
}
