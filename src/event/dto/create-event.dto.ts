import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {

    @IsString()
    Evento: string;
    
    @IsString()
    Lugar: string;
    
    @IsString()
    Viaje: string;

    @IsString()
    Hora_Reprogramada: string;

    @IsString()
    Imagen?: string | null;

    @IsString()
    Descripcion: string;

    @IsString()
    Titulo: string;

}
