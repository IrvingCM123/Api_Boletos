import { Injectable } from '@nestjs/common';
import { CreateCatalogoDestinoDto } from './dto/create-catalogo_destino.dto';
import { UpdateCatalogoDestinoDto } from './dto/update-catalogo_destino.dto';


import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoDestino } from './entities/catalogo_destino.entity';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { Errores_Catalogos } from 'src/common/helpers/Errores.service';
import { Exito_Catalogos } from 'src/common/helpers/Confirmaciones.service';
import { User_Interface } from 'src/common/interfaces/user.interface';


@Injectable()
export class CatalogoDestinosService {

  constructor(
    @InjectRepository(CatalogoDestino)
    private catalogoDestinoRepository: Repository<CatalogoDestino>,
  ) {}

  async create(createCatalogoDestinoDto: CreateCatalogoDestinoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let buscar = await this.catalogoDestinoRepository.findOne({
      where: { Terminal: createCatalogoDestinoDto.Terminal },
    });

    if (buscar == null) {
      this.catalogoDestinoRepository.save(createCatalogoDestinoDto);
      return Exito_Catalogos.CATALOGO_CREADO;
    } else {
      return Errores_Catalogos.CATALOG_ALREADY_EXISTS;
    }
  }

  findAll() {
    return this.catalogoDestinoRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoDestinoRepository.findOneById(id);
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  update(id: number, updateCatalogoDestinoDto: UpdateCatalogoDestinoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoDestinoRepository.update(id, updateCatalogoDestinoDto);
      return Exito_Catalogos.CATALOGO_ACTUALIZADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoDestinoRepository.delete(id);
      return Exito_Catalogos.CATALOGO_ELIMINADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }
}
