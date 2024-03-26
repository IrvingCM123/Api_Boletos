import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';

export class CreateCuentaDto {

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Transform(({ value }) => value.trim())
    password : string;

    @IsString()
    date_created : Date;

    id_usuario: Usuario;
}
