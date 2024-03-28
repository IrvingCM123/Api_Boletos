import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsBoolean 
} from 'class-validator';

export class CreateCatalogoIncidenteDto {

    @IsString()
    @IsNotEmpty()
    Tipo_Incidente: string;
}
