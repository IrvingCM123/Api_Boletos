import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsArray,
    MaxLength
    } from 'class-validator';

import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';
import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';

export class CreateViajeDto {

    @IsNotEmpty()
    ID_Detalle_Viaje: DetalleViaje;

    @IsNotEmpty()
    ID_Conductor: Conductore;

    @IsNotEmpty()
    ID_Detalle_Vehiculo: DetalleVehiculo;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    Status: string;

    @IsString()
    @IsNotEmpty()
    Numero_Servicio: string;

    @IsNumber()
    @IsNotEmpty()
    Asientos_Disponibles: number;

    @IsNumber()
    @IsNotEmpty()
    Asientos_Ocupados: number;

}
