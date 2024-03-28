import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoVehiculoDto } from './create-catalogo_vehiculo.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateCatalogoVehiculoDto extends PartialType(CreateCatalogoVehiculoDto) {

    @IsString()
    @MaxLength(30)
    TipoVehiculo : string;

}
