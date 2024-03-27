import { Injectable } from '@nestjs/common';
import { CreateCatalogoIncidenteDto } from './dto/create-catalogo_incidente.dto';
import { UpdateCatalogoIncidenteDto } from './dto/update-catalogo_incidente.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoIncidente } from './entities/catalogo_incidente.entity';

import { Rol } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Errores_Incidentes } from 'src/common/helpers/Errores.service';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { Message_Interface } from 'src/common/interfaces/message.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
@Injectable()
export class CatalogoIncidentesService {
  constructor(
    @InjectRepository(CatalogoIncidente)
    private catalogoIncidenteRepository: Repository<CatalogoIncidente>,
  ) {}

  create(
    createCatalogoIncidenteDto: CreateCatalogoIncidenteDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    let buscar = this.findOneByTipo(createCatalogoIncidenteDto.Tipo_Incidente);

    if (buscar) {
      throw new Error(Errores_Incidentes.EVENT_ALREADY_EXISTS);
    } else {
      try {
        return this.catalogoIncidenteRepository.save(
          createCatalogoIncidenteDto,
        );
      } catch (error) {
        throw new Error(Errores_Incidentes.EVENT_NOT_CREATED);
      }
    }
  }

  findAll(user: User_Interface) {
    validateOwnershipAdmin(user);

    return this.catalogoIncidenteRepository.find();
  }

  findOneByTipo(tipo: string) {
    return this.catalogoIncidenteRepository.findOne({
      where: { Tipo_Incidente: tipo },
    });
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoIncidenteRepository.findOneById(id);
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_FOUND);
    }
  }

  update(
    id: number,
    updateCatalogoIncidenteDto: UpdateCatalogoIncidenteDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoIncidenteRepository.update(
        id,
        updateCatalogoIncidenteDto,
      );
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_UPDATED);
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoIncidenteRepository.delete(id);
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_DELETED);
    }
  }
}
