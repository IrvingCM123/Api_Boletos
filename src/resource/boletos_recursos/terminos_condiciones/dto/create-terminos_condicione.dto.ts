import { IsString, MaxLength } from "class-validator";

export class CreateTerminosCondicioneDto {

    @IsString()
    @MaxLength(60)
    terminos_condiciones : string;
}
