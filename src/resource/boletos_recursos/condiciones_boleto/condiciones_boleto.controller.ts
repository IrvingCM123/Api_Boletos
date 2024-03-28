import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondicionesBoletoService } from './condiciones_boleto.service';
import { CreateCondicionesBoletoDto } from './dto/create-condiciones_boleto.dto';
import { UpdateCondicionesBoletoDto } from './dto/update-condiciones_boleto.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('condiciones-boleto')
export class CondicionesBoletoController {
  constructor(private readonly condicionesBoletoService: CondicionesBoletoService) {}

  @Post()
  create(@Body() createCondicionesBoletoDto: CreateCondicionesBoletoDto, @ActiveUser() user: User_Interface) {
    return this.condicionesBoletoService.create(createCondicionesBoletoDto, user);
  }

  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.condicionesBoletoService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.condicionesBoletoService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondicionesBoletoDto: UpdateCondicionesBoletoDto, @ActiveUser() user: User_Interface) {
    return this.condicionesBoletoService.update(+id, updateCondicionesBoletoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.condicionesBoletoService.remove(+id, user );
  }
}
