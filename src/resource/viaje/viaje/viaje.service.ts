import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';

import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from './entities/viaje.entity';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import {
  Errores_Viaje,
  Errores_Detalles_Viaje,
  Errores_Conducores,
  Errores_Vehiculos,
  Errores_Destinos,
} from 'src/common/helpers/Errores.service';
import {
  Exito_Viaje,
  Exito_Detalles_Viaje,
  Exito_Conductores,
  Exito_Vehiculos,
} from 'src/common/helpers/Confirmaciones.service';

import { DetalleViaje } from '../detalle_viaje/entities/detalle_viaje.entity';
import { Conductore } from '../../conductores/entities/conductore.entity';
import { DetalleVehiculo } from '../../transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { CatalogoDestino } from 'src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity';

import { DetalleViajeService } from '../detalle_viaje/detalle_viaje.service';
@Injectable()
export class ViajeService {
  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    @InjectRepository(Conductore)
    private conductoreRepository: Repository<Conductore>,
    @InjectRepository(DetalleVehiculo)
    private detalleVehiculoRepository: Repository<DetalleVehiculo>,
    @InjectRepository(DetalleViaje)
    private detalleViajeRepository: Repository<DetalleViaje>,
    @InjectRepository(CatalogoDestino)
    private catalogoDestinoRepository: Repository<CatalogoDestino>,
    private readonly connection: Connection,
  ) {}

  async create(createViajeDto: CreateViajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let validar_conductores = await this.Validar_Conductores(
      createViajeDto.ID_Conductor,
    );

    if (validar_conductores != true) {
      return validar_conductores;
    }

    let validar_vehiculos = await this.Validar_Vehiculos(
      createViajeDto.ID_Detalle_Vehiculo,
    );

    if (validar_vehiculos != true) {
      return validar_vehiculos;
    }

    let validar_destinos = await this.ValidarDestinos(
      createViajeDto.ID_Origen,
      createViajeDto.ID_Destino,
    );

    if (validar_destinos != true) {
      return validar_destinos;
    }

    const crear_detalle_viaje = {
      ID_Origen: createViajeDto.ID_Origen,
      ID_Destino: createViajeDto.ID_Destino,
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

      console.log("1");

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

  async ValidarDestinos(id_origen: any, id_destino: any) {
    let validar = true;

    if (id_origen == id_destino) {
      validar = false;
      return Errores_Destinos.DESTINOS_SAME;
    }

    let buscar_origen: any = await this.catalogoDestinoRepository.findOne({
      where: { id_catalogo_destino: id_origen },
    });

    if (buscar_origen == null) {
      validar = false;
      return Errores_Destinos.DESTINOS_NOT_FOUND;
    }

    let buscar_destino: any = await this.catalogoDestinoRepository.findOne({
      where: { id_catalogo_destino: id_destino },
    });

    if (buscar_destino == null) {
      validar = false;
      return Errores_Destinos.DESTINOS_NOT_FOUND;
    }

    return validar;
  }

  async Validar_Vehiculos(id_vehiculo: any) {
    let detalle_vehiculo_string = id_vehiculo.toString();
    let detalle_vehiculo_number = parseInt(detalle_vehiculo_string);

    let buscar_detalle_vehiculo: any =
      await this.detalleVehiculoRepository.findOne({
        where: { id_detalle_vehiculo: detalle_vehiculo_number },
      });

    if (buscar_detalle_vehiculo == null) {
      return Errores_Vehiculos.VEHICLE_NOT_FOUND;
    }

    return true;
  }

  async Validar_Conductores(id_conductor: any) {
    let conductor_string = id_conductor.toString();
    let conductor_number = parseInt(conductor_string);

    let buscar_conductor: any = await this.conductoreRepository.findOne({
      where: { id_conductor: conductor_number },
    });

    if (buscar_conductor == null) {
      return Errores_Conducores.DRIVER_NOT_FOUND;
    }

    return true;
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

    let viajesConDetalle: any = await this.viajeRepository
      .createQueryBuilder('viaje')
      .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
      .where('viaje.ID_Viaje = :id', { id })
      .getMany();

    try {
      return viajesConDetalle;
    } catch (error) {
      return Errores_Viaje.TRAVEL_NOT_FOUND;
    }
  }

  async update(
    id: number,
    updateViajeDto: UpdateViajeDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    let validar_conductores = await this.Validar_Conductores(
      updateViajeDto.ID_Conductor,
    );

    if (validar_conductores != true) {
      return validar_conductores;
    }

    let validar_vehiculos = await this.Validar_Vehiculos(
      updateViajeDto.ID_Detalle_Vehiculo,
    );

    if (validar_vehiculos != true) {
      return validar_vehiculos;
    }

    let validar_destinos = await this.ValidarDestinos(
      updateViajeDto.ID_Origen,
      updateViajeDto.ID_Destino,
    );

    if (validar_destinos != true) {
      return validar_destinos;
    }

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
      const viaje = await this.viajeRepository.findOneById(id);

      if (!viaje) {
        await queryRunner.rollbackTransaction();
        return Errores_Viaje.TRAVEL_NOT_FOUND;
      }
  
      const detalleViaje = await viaje.ID_Detalle_Viaje;
  
      await this.viajeRepository.remove(viaje);
  
      await this.detalleViajeRepository.remove(detalleViaje);
  
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
