import { Module } from '@nestjs/common';
import { CatalogoCategoriasService } from './catalogo_categorias.service';
import { CatalogoCategoriasController } from './catalogo_categorias.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoCategoria } from './entities/catalogo_categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoCategoria])],
  controllers: [CatalogoCategoriasController],
  providers: [CatalogoCategoriasService],
  exports: [CatalogoCategoriasService],
})
export class CatalogoCategoriasModule {}
