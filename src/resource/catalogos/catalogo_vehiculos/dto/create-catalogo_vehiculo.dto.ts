import { IsString, MaxLength } from "class-validator";

export class CreateCatalogoVehiculoDto {

    @IsString()
    @MaxLength(30)
    TipoVehiculo : string;
}
