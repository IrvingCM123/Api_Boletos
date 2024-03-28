import { Injectable } from '@nestjs/common';
import { CreateCatalogoVehiculoDto } from './dto/create-catalogo_vehiculo.dto';
import { UpdateCatalogoVehiculoDto } from './dto/update-catalogo_vehiculo.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoVehiculo } from './entities/catalogo_vehiculo.entity';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { Errores_Catalogos } from 'src/common/helpers/Errores.service';
import { Exito_Catalogos } from 'src/common/helpers/Confirmaciones.service';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Injectable()
export class CatalogoVehiculosService {
  constructor(
    @InjectRepository(CatalogoVehiculo)
    private catalogoVehiculoRepository: Repository<CatalogoVehiculo>,
  ) {}

  async create(
    createCatalogoVehiculoDto: CreateCatalogoVehiculoDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    let buscar = await this.catalogoVehiculoRepository.findOne({
      where: { TipoVehiculo: createCatalogoVehiculoDto.TipoVehiculo },
    });

    if (buscar == null) {
      this.catalogoVehiculoRepository.save(createCatalogoVehiculoDto);
      return Exito_Catalogos.CATALOGO_CREADO;
    } else {
      return Errores_Catalogos.CATALOG_ALREADY_EXISTS;
    }
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.catalogoVehiculoRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.catalogoVehiculoRepository.findOneById(id);
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  update(id: number, updateCatalogoVehiculoDto: UpdateCatalogoVehiculoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoVehiculoRepository.update(id, updateCatalogoVehiculoDto);
      return Exito_Catalogos.CATALOGO_ACTUALIZADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.catalogoVehiculoRepository.delete(id);
      return Exito_Catalogos.CATALOGO_ELIMINADO;
    } catch (error) {
      return Errores_Catalogos.CATALOG_NOT_FOUND;
    }
  }
}
