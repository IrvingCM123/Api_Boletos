import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogoDestinosService } from './catalogo_destinos.service';
import { CreateCatalogoDestinoDto } from './dto/create-catalogo_destino.dto';
import { UpdateCatalogoDestinoDto } from './dto/update-catalogo_destino.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('catalogo-destinos')
export class CatalogoDestinosController {
  constructor(private readonly catalogoDestinosService: CatalogoDestinosService) {}

  @Post()
  create(@Body() createCatalogoDestinoDto: CreateCatalogoDestinoDto, @ActiveUser() user: User_Interface) {
    return this.catalogoDestinosService.create(createCatalogoDestinoDto, user);
  }

  @Get()
  findAll() {
    return this.catalogoDestinosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoDestinosService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoDestinoDto: UpdateCatalogoDestinoDto, @ActiveUser() user: User_Interface) {
    return this.catalogoDestinosService.update(+id, updateCatalogoDestinoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoDestinosService.remove(+id, user);
  }
}
