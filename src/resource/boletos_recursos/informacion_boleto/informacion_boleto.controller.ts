import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformacionBoletoService } from './informacion_boleto.service';
import { CreateInformacionBoletoDto } from './dto/create-informacion_boleto.dto';
import { UpdateInformacionBoletoDto } from './dto/update-informacion_boleto.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('informacion-boleto')
export class InformacionBoletoController {
  constructor(private readonly informacionBoletoService: InformacionBoletoService) {}

  @Post()
  create(@Body() createInformacionBoletoDto: CreateInformacionBoletoDto, @ActiveUser() user: User_Interface) {
    return this.informacionBoletoService.create(createInformacionBoletoDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.informacionBoletoService.findAll( user );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.informacionBoletoService.findOne(+id, user );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformacionBoletoDto: UpdateInformacionBoletoDto, @ActiveUser() user: User_Interface) {
    return this.informacionBoletoService.update(+id, updateInformacionBoletoDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.informacionBoletoService.remove(+id, user);
  }
}
