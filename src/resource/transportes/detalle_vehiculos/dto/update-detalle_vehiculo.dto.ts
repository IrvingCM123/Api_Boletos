import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleVehiculoDto } from './create-detalle_vehiculo.dto';

import { IsString, MaxLength } from 'class-validator';
import { CatalogoVehiculo } from 'src/resource/catalogos/catalogo_vehiculos/entities/catalogo_vehiculo.entity';

export class UpdateDetalleVehiculoDto extends PartialType(CreateDetalleVehiculoDto) {

    @IsString()
    @MaxLength(20)
    marca: string;

    @IsString()
    @MaxLength(20)
    modelo: string;

    @IsString()
    @MaxLength(15)
    numero_placas: string;

    @IsString()
    TipoVehiculo: CatalogoVehiculo;
}
