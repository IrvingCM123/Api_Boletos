import { IsString, IsNotEmpty
    , IsNumber, MaxLength, MinLength
} from "class-validator";

export class CreateCatalogoCategoriaDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    categoria: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    codigo: string;
}
