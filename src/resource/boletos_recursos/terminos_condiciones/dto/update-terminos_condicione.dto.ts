import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminosCondicioneDto } from './create-terminos_condicione.dto';

import { IsString, MaxLength } from "class-validator";

export class UpdateTerminosCondicioneDto extends PartialType(CreateTerminosCondicioneDto) {

    @IsString()
    @MaxLength(60)
    terminos_condiciones : string;
}
