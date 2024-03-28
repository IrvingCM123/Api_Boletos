import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstruccionesSeguridadService } from './instrucciones_seguridad.service';
import { CreateInstruccionesSeguridadDto } from './dto/create-instrucciones_seguridad.dto';
import { UpdateInstruccionesSeguridadDto } from './dto/update-instrucciones_seguridad.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('instrucciones-seguridad')
export class InstruccionesSeguridadController {
  constructor(private readonly instruccionesSeguridadService: InstruccionesSeguridadService) {}

  @Post()
  create(@Body() createInstruccionesSeguridadDto: CreateInstruccionesSeguridadDto, @ActiveUser() user: User_Interface) {
    return this.instruccionesSeguridadService.create(createInstruccionesSeguridadDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.instruccionesSeguridadService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.instruccionesSeguridadService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstruccionesSeguridadDto: UpdateInstruccionesSeguridadDto, @ActiveUser() user: User_Interface) {
    return this.instruccionesSeguridadService.update(+id, updateInstruccionesSeguridadDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.instruccionesSeguridadService.remove(+id, user);
  }
}
