import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogoCategoriasService } from './catalogo_categorias.service';
import { CreateCatalogoCategoriaDto } from './dto/create-catalogo_categoria.dto';
import { UpdateCatalogoCategoriaDto } from './dto/update-catalogo_categoria.dto';

@Controller('catalogo-categorias')
export class CatalogoCategoriasController {
  constructor(private readonly catalogoCategoriasService: CatalogoCategoriasService) {}

  @Post()
  create(@Body() createCatalogoCategoriaDto: CreateCatalogoCategoriaDto) {
    return this.catalogoCategoriasService.create(createCatalogoCategoriaDto);
  }

  @Get()
  findAll() {
    return this.catalogoCategoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoCategoriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoCategoriaDto: UpdateCatalogoCategoriaDto) {
    return this.catalogoCategoriasService.update(+id, updateCatalogoCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogoCategoriasService.remove(+id);
  }
}
