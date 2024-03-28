import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsArray,
    MaxLength,
    Matches
    } from 'class-validator';

import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { CatalogoDestino } from 'src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity';

export class CreateViajeDto {

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

    //Detalle Viaje

    @IsNumber()
    @IsNotEmpty()
    ID_Origen: CatalogoDestino;

    @IsNumber()
    @IsNotEmpty()
    ID_Destino: CatalogoDestino;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/) // Validar el formato de la fecha (dd-mm-yyyy)
    fecha_salida: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/)
    fecha_llegada: string;

    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsNotEmpty()
    hora_salida: string;

    @IsString()
    @IsNotEmpty()
    hora_llegada: string;


}
