import { PartialType } from '@nestjs/mapped-types';
import { CreateInstruccionesSeguridadDto } from './create-instrucciones_seguridad.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateInstruccionesSeguridadDto extends PartialType(CreateInstruccionesSeguridadDto) {

    @IsString()
    @MaxLength(60)
    Instruccion : string;

}
