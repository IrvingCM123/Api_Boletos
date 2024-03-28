import { IsString, MaxLength } from "class-validator";

export class CreateInstruccionesAbordajeDto {

    @IsString()
    @MaxLength(60)
    Instruccion : string;

}
