import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateViajeDto } from './create-viaje.dto';

export class UpdateViajeDto extends PartialType(CreateViajeDto) {

    @IsNotEmpty()
    @IsString()
    Status_viaje: string;

    @IsNotEmpty()
    @IsString()
    Numero_Servicio: string;

    @IsNotEmpty()
    @IsString()
    Detalle_Viaje: string;

    @IsNotEmpty()
    @IsString()
    Transporte: string;

    @IsNotEmpty()
    @IsString()
    Conductor: string;

}
