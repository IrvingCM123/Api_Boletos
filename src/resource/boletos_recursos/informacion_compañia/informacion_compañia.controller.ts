import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformacionCompañiaService } from './informacion_compañia.service';
import { CreateInformacionCompañiaDto } from './dto/create-informacion_compañia.dto';
import { UpdateInformacionCompañiaDto } from './dto/update-informacion_compañia.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('informacion-compañia')
export class InformacionCompañiaController {
  constructor(private readonly informacionCompañiaService: InformacionCompañiaService) {}

  @Post()
  create(@Body() createInformacionCompañiaDto: CreateInformacionCompañiaDto, @ActiveUser() user: User_Interface) {
    return this.informacionCompañiaService.create(createInformacionCompañiaDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.informacionCompañiaService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.informacionCompañiaService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformacionCompañiaDto: UpdateInformacionCompañiaDto, @ActiveUser() user: User_Interface) {
    return this.informacionCompañiaService.update(+id, updateInformacionCompañiaDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.informacionCompañiaService.remove(+id, user);
  }
}
