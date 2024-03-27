import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogoIncidentesService } from './catalogo_incidentes.service';
import { CreateCatalogoIncidenteDto } from './dto/create-catalogo_incidente.dto';
import { UpdateCatalogoIncidenteDto } from './dto/update-catalogo_incidente.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('catalogo-incidentes')
export class CatalogoIncidentesController {
  constructor(private readonly catalogoIncidentesService: CatalogoIncidentesService) {}

  @Post()
  create(@Body() createCatalogoIncidenteDto: CreateCatalogoIncidenteDto, @ActiveUser() user: User_Interface){
    return this.catalogoIncidentesService.create(createCatalogoIncidenteDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: User_Interface) {
    return this.catalogoIncidentesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoIncidentesService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoIncidenteDto: UpdateCatalogoIncidenteDto, @ActiveUser() user: User_Interface) {
    return this.catalogoIncidentesService.update(+id, updateCatalogoIncidenteDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoIncidentesService.remove(+id, user);
  }
}
