import { Injectable } from '@nestjs/common';
import { CreateCatalogoCategoriaDto } from './dto/create-catalogo_categoria.dto';
import { UpdateCatalogoCategoriaDto } from './dto/update-catalogo_categoria.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoCategoria } from './entities/catalogo_categoria.entity';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { Errores_Catalogos } from 'src/common/helpers/Errores.service';
import { Exito_Catalogos } from 'src/common/helpers/Confirmaciones.service';

@Injectable()
export class CatalogoCategoriasService {

  constructor(
    @InjectRepository(CatalogoCategoria)
    private catalogoCategoriaRepository: Repository<CatalogoCategoria>
  ) {}

  async create(createCatalogoCategoriaDto: CreateCatalogoCategoriaDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let buscar = await this.catalogoCategoriaRepository.findOne({
      where: { categoria: createCatalogoCategoriaDto.categoria },
    });

    if (buscar == null) {
      this.catalogoCategoriaRepository.save(createCatalogoCategoriaDto);
      return Exito_Catalogos.CATALOGO_CREADO;
    } else {
      return Errores_Catalogos.CATALOG_ALREADY_EXISTS;
    }
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.catalogoCategoriaRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoCategoriaRepository.findOneById(id);
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  update(id: number, updateCatalogoCategoriaDto: UpdateCatalogoCategoriaDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoCategoriaRepository.update(id, updateCatalogoCategoriaDto);
      return Exito_Catalogos.CATALOGO_ACTUALIZADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoCategoriaRepository.delete(id);
      return Exito_Catalogos.CATALOGO_ELIMINADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }
}
