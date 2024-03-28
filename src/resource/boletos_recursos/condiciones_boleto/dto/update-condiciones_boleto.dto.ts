import { PartialType } from '@nestjs/mapped-types';
import { CreateCondicionesBoletoDto } from './create-condiciones_boleto.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateCondicionesBoletoDto extends PartialType(CreateCondicionesBoletoDto) {

    @IsString()
    @MaxLength(100)
    condicion : string;
}
