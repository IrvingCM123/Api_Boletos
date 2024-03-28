import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstruccionesAbordajeService } from './instrucciones_abordaje.service';
import { CreateInstruccionesAbordajeDto } from './dto/create-instrucciones_abordaje.dto';
import { UpdateInstruccionesAbordajeDto } from './dto/update-instrucciones_abordaje.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('instrucciones-abordaje')
export class InstruccionesAbordajeController {
  constructor(private readonly instruccionesAbordajeService: InstruccionesAbordajeService) {}

  @Post()
  create(@Body() createInstruccionesAbordajeDto: CreateInstruccionesAbordajeDto, @ActiveUser() user: User_Interface) {
    return this.instruccionesAbordajeService.create(createInstruccionesAbordajeDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.instruccionesAbordajeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.instruccionesAbordajeService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstruccionesAbordajeDto: UpdateInstruccionesAbordajeDto, @ActiveUser() user: User_Interface) {
    return this.instruccionesAbordajeService.update(+id, updateInstruccionesAbordajeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.instruccionesAbordajeService.remove(+id, user);
  }
}
