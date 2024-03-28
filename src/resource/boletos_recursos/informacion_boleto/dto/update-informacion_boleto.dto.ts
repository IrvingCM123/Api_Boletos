import { PartialType } from '@nestjs/mapped-types';
import { CreateInformacionBoletoDto } from './create-informacion_boleto.dto';

import { IsNotEmpty } from 'class-validator';


export class UpdateInformacionBoletoDto extends PartialType(CreateInformacionBoletoDto) {

    @IsNotEmpty()
    ID_Informacion_Boleto: number[];

    @IsNotEmpty()
    id_condicion_boleto: number[];

    @IsNotEmpty()
    id_dato_emergencia: number[];

    @IsNotEmpty()
    id_informacion_compañia: number[];

    @IsNotEmpty()
    id_documentacion_abordaje: number[];

    @IsNotEmpty()
    id_instrucciones_abordaje: number[];

    @IsNotEmpty()
    id_instrucciones_seguridad: number[];

    @IsNotEmpty()
    id_terminos_condiciones: number[];

}
