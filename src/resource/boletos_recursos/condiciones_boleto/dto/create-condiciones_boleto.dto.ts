import { IsString, MaxLength } from "class-validator";

export class CreateCondicionesBoletoDto {

    @IsString()
    @MaxLength(100)
    condicion : string;

}
