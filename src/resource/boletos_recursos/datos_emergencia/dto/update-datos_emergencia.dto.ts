import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosEmergenciaDto } from './create-datos_emergencia.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateDatosEmergenciaDto extends PartialType(CreateDatosEmergenciaDto) {
    
        @IsString()
        @MaxLength(30)
        Nombre : string;
    
        @IsString()
        @MaxLength(50)
        Descripcion : string;
}
