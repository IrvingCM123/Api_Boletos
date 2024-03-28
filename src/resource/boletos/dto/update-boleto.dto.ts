import { PartialType } from '@nestjs/mapped-types';
import { CreateBoletoDto } from './create-boleto.dto';

import { IsString, IsNumber, IsDate, MaxLength } from "class-validator";
import { InformacionBoleto } from "src/resource/boletos_recursos/informacion_boleto/entities/informacion_boleto.entity";
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from "src/resource/viaje/viaje/entities/viaje.entity";

export class UpdateBoletoDto extends PartialType(CreateBoletoDto) {

    @IsString()
    @MaxLength(10)
    Asiento: string;

    @IsString()
    Fecha_Reserva: string;

    @IsString()
    Status: string;

    @IsString()
    Precio: string;

    @IsNumber()
    id_informacion_boleto: number;

    @IsNumber()
    id_usuario: number;

    @IsNumber()
    ID_Viaje: number;

}
