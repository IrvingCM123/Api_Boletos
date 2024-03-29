import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';


@Auth(Rol.USER)
@Auth(Rol.ADMIN)
@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Post()
  create(@Body() createBoletoDto: CreateBoletoDto, @ActiveUser() user: User_Interface) {
    return this.boletosService.create(createBoletoDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.boletosService.findAll( user );
  }

  @Get('/obtenerBoletos/:email')
  buscar_boletos_email(@Param('email') email: string, @ActiveUser() user: User_Interface) {
    return this.boletosService.buscar_boletos_email(email, user );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.boletosService.findOne(+id, user );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoletoDto: UpdateBoletoDto, @ActiveUser() user: User_Interface) {
    return this.boletosService.update(+id, updateBoletoDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.boletosService.remove(+id, user );
  }
}
