import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoDestinoDto } from './create-catalogo_destino.dto';

import { IsString, MaxLength } from 'class-validator';

export class UpdateCatalogoDestinoDto extends PartialType(CreateCatalogoDestinoDto) {

    @IsString()
    @MaxLength(30)
    Terminal: string;

    @IsString()
    @MaxLength(30)
    Ciudad: string;

    @IsString()
    @MaxLength(30)
    Estado: string;

    @IsString()
    @MaxLength(100)
    coordenadas: string;

}
