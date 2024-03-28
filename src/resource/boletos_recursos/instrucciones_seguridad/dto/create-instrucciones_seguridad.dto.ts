import { IsString, MaxLength } from "class-validator";

export class CreateInstruccionesSeguridadDto {

    @IsString()
    @MaxLength(60)
    Instruccion : string;

}
