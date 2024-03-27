import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from './entities/viaje.entity';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { Errores_Viaje, Errores_Detalles_Viaje, Errores_Conducores, Errores_Vehiculos } from 'src/common/helpers/Errores.service';
import { Exito_Viaje, Exito_Detalles_Viaje, Exito_Conductores, Exito_Vehiculos } from 'src/common/helpers/Confirmaciones.service';

import { DetalleViaje } from '../detalle_viaje/entities/detalle_viaje.entity';
import { Conductore } from '../../conductores/entities/conductore.entity';
import { DetalleVehiculo } from '../../transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';

@Injectable()
export class ViajeService {

  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    @InjectRepository(DetalleViaje)
    private detalleViajeRepository: Repository<DetalleViaje>,
    @InjectRepository(Conductore)
    private conductoreRepository: Repository<Conductore>,
    @InjectRepository(DetalleVehiculo)
    private detalleVehiculoRepository: Repository<DetalleVehiculo>
  ) {}

  create(createViajeDto: CreateViajeDto, user: User_Interface) {

    validateOwnershipAdmin(user);

    let detalle_viaje_string = createViajeDto.ID_Detalle_Viaje.toString();
    let detalle_viaje_number = parseInt(detalle_viaje_string);

    let buscar_detalle_viaje :any = this.detalleViajeRepository.findOne({
      where: { id_detalle_viaje: detalle_viaje_number },
    });

    if (!buscar_detalle_viaje) {
      return Errores_Detalles_Viaje.DETAIL_NOT_FOUND;
    }

    let conductor_string = createViajeDto.ID_Conductor.toString();
    let conductor_number = parseInt(conductor_string);

    let buscar_conductor :any = this.conductoreRepository.findOne({
      where: { id_conductor: conductor_number },
    });

    if (!buscar_conductor) {
      return Errores_Conducores.DRIVER_NOT_FOUND;
    }

    let detalle_vehiculo_string = createViajeDto.ID_Detalle_Vehiculo.toString();
    let detalle_vehiculo_number = parseInt(detalle_vehiculo_string);

    let buscar_detalle_vehiculo :any = this.detalleVehiculoRepository.findOne({
      where: { id_detalle_vehiculo: detalle_vehiculo_number },
    });

    if (!buscar_detalle_vehiculo) {
      return Errores_Vehiculos.VEHICLE_NOT_FOUND;
    }

    this.viajeRepository.save(createViajeDto);

    return Exito_Viaje.VIAJE_CREADO;
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.viajeRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.viajeRepository.findOneById(id);
    } catch (error) {
      return Errores_Viaje.TRAVEL_NOT_FOUND;
    }
  }

  update(id: number, updateViajeDto: UpdateViajeDto , user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.viajeRepository.update(id, updateViajeDto);
      return Exito_Viaje.VIAJE_ACTUALIZADO;
    } catch (error) {
      return Errores_Viaje.TRAVEL_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.viajeRepository.delete(id);
      return Exito_Viaje.VIAJE_ELIMINADO;
    } catch (error) {
      return Errores_Viaje.TRAVEL_NOT_FOUND;
    }
  }
}
