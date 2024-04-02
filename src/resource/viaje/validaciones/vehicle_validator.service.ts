import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from '../viaje/entities/viaje.entity';

import {
    Errores_Vehiculos,
} from 'src/common/helpers/Errores.service';

import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
@Injectable()
export class Vehicles_Validations {
    constructor(
        @InjectRepository(Viaje)
        private viajeRepository: Repository<Viaje>,
        @InjectRepository(DetalleVehiculo)
        private vehicleRepository: Repository<DetalleVehiculo>,
    ) { }

    async Vehicle_Validation(id_vehicle: any) {
        let vehicle = id_vehicle.toString();
        let vehicle_id = parseInt(vehicle);

        let search_vehicle: any = await this.vehicleRepository.findOne({
            where: { id_detalle_vehiculo: vehicle_id },
        });

        if (search_vehicle == null) {
            throw new Error(Errores_Vehiculos.VEHICLE_NOT_FOUND);
        }

        return true;
    }

    async Conductores_Viaje(id_conductor) {

        const viaje: any = await this.viajeRepository
            .createQueryBuilder('viaje')
            .leftJoinAndSelect('viaje.ID_Conductor', 'conductores')
            .where('viaje.ID_Conductor = :ID_Conductor', {
                ID_Conductor: id_conductor,
            })
            .getMany();

        console.log(viaje)

    }
}
