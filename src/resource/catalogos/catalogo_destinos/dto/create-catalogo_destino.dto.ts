import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCatalogoDestinoDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    Terminal: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    Ciudad: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    Estado: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    coordenadas: string;

}
