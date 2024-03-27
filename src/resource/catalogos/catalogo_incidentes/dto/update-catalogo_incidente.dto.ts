import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoIncidenteDto } from './create-catalogo_incidente.dto';

import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCatalogoIncidenteDto extends PartialType(CreateCatalogoIncidenteDto) {
    @IsString()
    @IsNotEmpty()
    Tipo_Incidente: string;
}
