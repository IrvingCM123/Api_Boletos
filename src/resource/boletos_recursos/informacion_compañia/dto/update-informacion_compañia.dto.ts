import { PartialType } from '@nestjs/mapped-types';
import { CreateInformacionCompañiaDto } from './create-informacion_compañia.dto';
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateInformacionCompañiaDto extends PartialType(CreateInformacionCompañiaDto) {

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
