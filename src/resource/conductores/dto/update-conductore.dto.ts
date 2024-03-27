import { PartialType } from '@nestjs/mapped-types';
import { CreateConductoreDto } from './create-conductore.dto';

import { IsString } from "class-validator";
import { Usuario } from "src/resource/usuario/entities/usuario.entity";

export class UpdateConductoreDto extends PartialType(CreateConductoreDto) {

    @IsString() 
    Licencia: string;

    @IsString()
    email: string;
}
