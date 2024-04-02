import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';

import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from './entities/viaje.entity';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import {
  Errores_Viaje, Errores_Detalles_Viaje,
} from 'src/common/helpers/Errores.service';

import {
  Exito_Viaje, Exito_Detalles_Viaje,
} from 'src/common/helpers/Confirmaciones.service';

import { DetalleViaje } from '../detalle_viaje/entities/detalle_viaje.entity';

import { DetalleViajeService } from '../detalle_viaje/detalle_viaje.service';
import { Drivers_Validation } from '../../../common/validation/conductor_validar.service';
import { Vehicles_Validations } from '../../../common/validation/vehicle_validator.service';
import { Destination_Validation } from '../../../common/validation/destination_validator.service';

import { Crear_Viaje } from '../validaciones/object/travel.object';
import { Crear_Detalle_Viaje } from '../validaciones/object/detail_travel.object';
import { QuerysService } from 'src/common/sql/Querys.service';

@Injectable()
export class ViajeService {
  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    private readonly connection: Connection,
    private detalleViajeService: DetalleViajeService,
    private driver_validator: Drivers_Validation,
    private vehicle_validator: Vehicles_Validations,
    private destination_validator: Destination_Validation,
    private querysService: QuerysService,
  ) {}

  async create(createViajeDto: CreateViajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    await this.driver_validator.Validar_Conductores(createViajeDto.ID_Conductor);

    await this.vehicle_validator.Vehicle_Validation(createViajeDto.ID_Detalle_Vehiculo);

    await this.destination_validator.Destination_Valitation(createViajeDto.ID_Origen, createViajeDto.ID_Destino);

    let crear_detalle_viaje = await Crear_Detalle_Viaje(createViajeDto);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear el detalle del viaje
      let detalle_viaje: any = await queryRunner.manager.save( DetalleViaje, crear_detalle_viaje);

      if (detalle_viaje == null || detalle_viaje == undefined) {
        await queryRunner.rollbackTransaction();
      }

      let viaje = await Crear_Viaje(createViajeDto, detalle_viaje.id_detalle_viaje);

      await queryRunner.manager.save(Viaje, viaje);

      // Commit de la transacción
      await queryRunner.commitTransaction();

      return Exito_Viaje.VIAJE_CREADO;
    } catch (error) {
      // Si hay algún error, hacer rollback de la transacción
      await queryRunner.rollbackTransaction();
      return Errores_Viaje.TRAVEL_NOT_CREATED;
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  async findAll(user: User_Interface) {
    validateOwnershipAdmin(user);
    return await this.querysService.Viaje_DetalleViaje_WithoutID();
  }

  async findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return await this.querysService.Viaje_DetalleViaje_WithID(id);
    } catch (error) {
      throw new Error(Errores_Viaje.TRAVEL_NOT_FOUND);
    }
  }

  async update(id: number, updateViajeDto: UpdateViajeDto, user: User_Interface) {

    validateOwnershipAdmin(user);

    await this.driver_validator.Validar_Conductores(updateViajeDto.ID_Conductor)

    await this.vehicle_validator.Vehicle_Validation(updateViajeDto.ID_Detalle_Vehiculo);
  
    await this.destination_validator.Destination_Valitation(updateViajeDto.ID_Origen, updateViajeDto.ID_Destino );

    const crear_detalle_viaje = await Crear_Detalle_Viaje(updateViajeDto);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let detalle_viaje: any = await queryRunner.manager.update(DetalleViaje,id,crear_detalle_viaje);

      await queryRunner.rollbackTransaction();

      let viaje = await Crear_Viaje(updateViajeDto, detalle_viaje.id_detalle_viaje);

      await queryRunner.manager.update(Viaje, id, viaje);

      await queryRunner.commitTransaction();

      return Exito_Viaje.VIAJE_CREADO;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return Errores_Viaje.TRAVEL_NOT_CREATED;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {

      let viaje: any = await this.querysService.Viaje_DetalleViaje_WithID(id);

      if (!viaje) {
        await queryRunner.rollbackTransaction();
        return Errores_Viaje.TRAVEL_NOT_FOUND;
      }
  
      const detalleViaje = await viaje.ID_Detalle_Viaje;

      const viaje_ID = await this.viajeRepository.findOne({ 
        where: { ID_Viaje: viaje.ID_Viaje }
      });

      await this.viajeRepository.delete(viaje_ID);
  
      await this.detalleViajeService.remove(detalleViaje.id_detalle_viaje, user);

      await queryRunner.commitTransaction();
  
      return Exito_Viaje.VIAJE_ELIMINADO;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return Errores_Viaje.TRAVEL_NOT_DELETED;
    } finally {
      await queryRunner.release();
    }
  }
  
}
