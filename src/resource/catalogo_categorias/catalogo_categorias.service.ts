import { Injectable } from '@nestjs/common';
import { CreateCatalogoCategoriaDto } from './dto/create-catalogo_categoria.dto';
import { UpdateCatalogoCategoriaDto } from './dto/update-catalogo_categoria.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoCategoria } from './entities/catalogo_categoria.entity';

@Injectable()
export class CatalogoCategoriasService {

  constructor(
    @InjectRepository(CatalogoCategoria)
    private catalogoCategoriaRepository: Repository<CatalogoCategoria>
  ) {}

  create(createCatalogoCategoriaDto: CreateCatalogoCategoriaDto) {
    return this.catalogoCategoriaRepository.save(createCatalogoCategoriaDto);
  }

  findAll() {
    return this.catalogoCategoriaRepository.find();
  }

  findOne(id: number) {
    return this.catalogoCategoriaRepository.findOneById(id);
  }

  update(id: number, updateCatalogoCategoriaDto: UpdateCatalogoCategoriaDto) {
    return this.catalogoCategoriaRepository.update(id, updateCatalogoCategoriaDto);
  }

  remove(id: number) {
    return this.catalogoCategoriaRepository.delete(id);
  }
}
