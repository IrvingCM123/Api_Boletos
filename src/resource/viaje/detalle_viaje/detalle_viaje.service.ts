import { Injectable } from '@nestjs/common';
import { CreateDetalleViajeDto } from './dto/create-detalle_viaje.dto';
import { UpdateDetalleViajeDto } from './dto/update-detalle_viaje.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleViaje } from './entities/detalle_viaje.entity';
import { validateOwnershipAll } from 'src/Guard/validateOwnerShip.guard';
import { Errores_Detalles_Viaje } from 'src/common/helpers/Errores.service';
import { Exito_Detalles_Viaje } from 'src/common/helpers/Confirmaciones.service';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Injectable()
export class DetalleViajeService {
  constructor(
    @InjectRepository(DetalleViaje)
    private detalleViajeRepository: Repository<DetalleViaje>,
  ) {}

  async create(
    createDetalleViajeDto: CreateDetalleViajeDto,
    user: User_Interface,
  ) {
    validateOwnershipAll(user);

    try {
      return {
        message: Exito_Detalles_Viaje.DETALLE_VIAJE_CREADO,
        result: await this.detalleViajeRepository.save(createDetalleViajeDto),
      };
    } catch (error) {
      return Errores_Detalles_Viaje.DETAIL_NOT_CREATED;
    }
  }

  findAll(user: User_Interface) {
    validateOwnershipAll(user);
    return this.detalleViajeRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAll(user);

    try {
      return this.detalleViajeRepository.findOneById(id);
    } catch (error) {
      return Errores_Detalles_Viaje.DETAIL_NOT_FOUND;
    }
  }

  update(
    id: number,
    updateDetalleViajeDto: UpdateDetalleViajeDto,
    user: User_Interface,
  ) {
    validateOwnershipAll(user);

    try {
      this.detalleViajeRepository.update(id, updateDetalleViajeDto);
      return Exito_Detalles_Viaje.DETALLE_VIAJE_ACTUALIZADO;
    } catch (error) {
      return Errores_Detalles_Viaje.DETAIL_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAll(user);

    try {
      this.detalleViajeRepository.delete(id);
      return Exito_Detalles_Viaje.DETALLE_VIAJE_ELIMINADO;
    } catch (error) {
      return Errores_Detalles_Viaje.DETAIL_NOT_FOUND;
    }
  }
}
