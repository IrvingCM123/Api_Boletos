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
import { DetalleVehiculo } from '../../transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { CatalogoDestino } from 'src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity';

import { DetalleViajeService } from '../detalle_viaje/detalle_viaje.service';
import { Drivers_Validation } from '../validaciones/conductor_validar.service';
import { Vehicles_Validations } from '../validaciones/vehicle_validator.service';
import { Destination_Validation } from '../validaciones/destination_validator.service';
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
  ) {}

  async create(createViajeDto: CreateViajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    await this.driver_validator.Validar_Conductores(createViajeDto.ID_Conductor);

    await this.vehicle_validator.Vehicle_Validation(createViajeDto.ID_Detalle_Vehiculo);

    await this.destination_validator.Destination_Valitation(createViajeDto.ID_Origen, createViajeDto.ID_Destino);

    const crear_detalle_viaje = {
      origen: createViajeDto.ID_Origen,
      destino: createViajeDto.ID_Destino,
      fecha_salida: createViajeDto.fecha_salida,
      fecha_llegada: createViajeDto.fecha_llegada,
      precio: createViajeDto.precio,
      hora_salida: createViajeDto.hora_salida,
      hora_llegada: createViajeDto.hora_llegada,
    };

    let detalle_viaje: any;
    let viaje: any;

    // Comenzar una transacción
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear el detalle del viaje
      detalle_viaje = await queryRunner.manager.save(
        DetalleViaje,
        crear_detalle_viaje,
      );

      if (detalle_viaje == null || detalle_viaje == undefined) {
        await queryRunner.rollbackTransaction();
      }

      // Crear el viaje
      viaje = {
        ID_Detalle_Viaje: detalle_viaje.id_detalle_viaje,
        ID_Conductor: createViajeDto.ID_Conductor,
        ID_Detalle_Vehiculo: createViajeDto.ID_Detalle_Vehiculo,
        Status: createViajeDto.Status,
        Numero_Servicio: createViajeDto.Numero_Servicio,
        Asientos_Disponibles: createViajeDto.Asientos_Disponibles,
        Asientos_Ocupados: createViajeDto.Asientos_Ocupados,
      };

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

    let viajesConDetalle: any = await this.viajeRepository
      .createQueryBuilder('viaje')
      .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
      .getMany();

    return viajesConDetalle;
  }

  async findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return await this.viajeRepository
        .createQueryBuilder('viaje')
        .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
        .where('viaje.ID_Viaje = :id', { id })
        .getMany();
    } catch (error) {
      throw new Error(Errores_Viaje.TRAVEL_NOT_FOUND);
    }
  }

  async update(id: number, updateViajeDto: UpdateViajeDto, user: User_Interface) {

    validateOwnershipAdmin(user);

    await this.driver_validator.Validar_Conductores(updateViajeDto.ID_Conductor)

    await this.vehicle_validator.Vehicle_Validation(updateViajeDto.ID_Detalle_Vehiculo);
  
    await this.destination_validator.Destination_Valitation(updateViajeDto.ID_Origen, updateViajeDto.ID_Destino );

    const crear_detalle_viaje = {
      ID_Origen: updateViajeDto.ID_Origen,
      ID_Destino: updateViajeDto.ID_Destino,
      fecha_salida: updateViajeDto.fecha_salida,
      fecha_llegada: updateViajeDto.fecha_llegada,
      precio: updateViajeDto.precio,
      hora_salida: updateViajeDto.hora_salida,
      hora_llegada: updateViajeDto.hora_llegada,
    };

    let detalle_viaje: any;
    let viaje: any;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      detalle_viaje = await queryRunner.manager.update(
        DetalleViaje,
        id,
        crear_detalle_viaje,
      );

      if (detalle_viaje.message !== Exito_Detalles_Viaje.DETALLE_VIAJE_CREADO) {
        await queryRunner.rollbackTransaction();
        return Errores_Detalles_Viaje.DETAIL_NOT_CREATED;
      }

      viaje = {
        ID_Detalle_Viaje: detalle_viaje.result.id_detalle_viaje,
        ID_Conductor: updateViajeDto.ID_Conductor,
        ID_Detalle_Vehiculo: updateViajeDto.ID_Detalle_Vehiculo,
        Status: updateViajeDto.Status,
        Numero_Servicio: updateViajeDto.Numero_Servicio,
        Asientos_Disponibles: updateViajeDto.Asientos_Disponibles,
        Asientos_Ocupados: updateViajeDto.Asientos_Ocupados,
      };

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
  
    // Comenzar una transacción
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {

      let viaje = await this.viajeRepository
      .createQueryBuilder('viaje')
      .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
      .where('viaje.ID_Viaje = :ID_Viaje', { ID_Viaje: id })
      .getOne();

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
