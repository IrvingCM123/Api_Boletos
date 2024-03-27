import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoCategoriaDto } from './create-catalogo_categoria.dto';

import { IsString, IsNotEmpty
    , IsNumber, MaxLength, MinLength
} from "class-validator";


export class UpdateCatalogoCategoriaDto extends PartialType(CreateCatalogoCategoriaDto) {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    categoria: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    codigo: string;
}
