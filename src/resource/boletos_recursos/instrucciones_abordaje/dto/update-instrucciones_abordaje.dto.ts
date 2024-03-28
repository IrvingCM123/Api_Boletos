import { PartialType } from '@nestjs/mapped-types';
import { CreateInstruccionesAbordajeDto } from './create-instrucciones_abordaje.dto';
import { IsString, MaxLength } from "class-validator";

export class UpdateInstruccionesAbordajeDto extends PartialType(CreateInstruccionesAbordajeDto) {
    
        @IsString()
        @MaxLength(60)
        Instruccion : string;
}
