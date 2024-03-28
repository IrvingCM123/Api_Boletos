import { IsString, IsNotEmpty } from "class-validator";

export class CreateInformacionCompañiaDto {

    @IsString() 
    @IsNotEmpty()
    Nombre_Compañia: string;

    @IsString()
    @IsNotEmpty()
    Direccion: string;

    @IsString()
    @IsNotEmpty()
    Telefono: string;

    @IsString()
    @IsNotEmpty()
    Correo: string;

    @IsString()
    @IsNotEmpty()
    Sitio_Web: string;
}
