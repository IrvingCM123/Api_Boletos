import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogoCategoriasService } from './catalogo_categorias.service';
import { CreateCatalogoCategoriaDto } from './dto/create-catalogo_categoria.dto';
import { UpdateCatalogoCategoriaDto } from './dto/update-catalogo_categoria.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Rol.ADMIN)
@Controller('catalogo-categorias')
export class CatalogoCategoriasController {
  constructor(private readonly catalogoCategoriasService: CatalogoCategoriasService) {}

  @Post()
  create(@Body() createCatalogoCategoriaDto: CreateCatalogoCategoriaDto, @ActiveUser() user: User_Interface) {
    return this.catalogoCategoriasService.create(createCatalogoCategoriaDto, user);
  }

  @Get()
  findAll( user: User_Interface) {
    return this.catalogoCategoriasService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoCategoriasService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoCategoriaDto: UpdateCatalogoCategoriaDto, @ActiveUser() user: User_Interface) {
    return this.catalogoCategoriasService.update(+id, updateCatalogoCategoriaDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.catalogoCategoriasService.remove(+id, user);
  }
}
