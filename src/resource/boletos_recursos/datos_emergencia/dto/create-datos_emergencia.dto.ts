import { IsString, MaxLength } from "class-validator";

export class CreateDatosEmergenciaDto {

    @IsString()
    @MaxLength(30)
    Nombre : string;

    @IsString()
    @MaxLength(50)
    Descripcion : string;

}
