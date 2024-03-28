import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleViajeService } from './detalle_viaje.service';
import { CreateDetalleViajeDto } from './dto/create-detalle_viaje.dto';
import { UpdateDetalleViajeDto } from './dto/update-detalle_viaje.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Auth(Rol.USER)
@Controller('detalle-viaje')
export class DetalleViajeController {
  constructor(private readonly detalleViajeService: DetalleViajeService) {}

  @Post()
  create(@Body() createDetalleViajeDto: CreateDetalleViajeDto, @ActiveUser() user: User_Interface) {
    return this.detalleViajeService.create(createDetalleViajeDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.detalleViajeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.detalleViajeService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleViajeDto: UpdateDetalleViajeDto, @ActiveUser() user: User_Interface) {
    return this.detalleViajeService.update(+id, updateDetalleViajeDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.detalleViajeService.remove(+id, user);
  }
}
