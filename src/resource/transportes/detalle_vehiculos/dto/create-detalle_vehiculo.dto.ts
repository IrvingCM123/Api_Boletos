import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { CatalogoVehiculo } from 'src/resource/catalogos/catalogo_vehiculos/entities/catalogo_vehiculo.entity';

export class CreateDetalleVehiculoDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    marca: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    modelo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    numero_placas: string;

    @IsString()
    @IsNotEmpty()
    TipoVehiculo: CatalogoVehiculo;

    @IsNumber()
    @IsNotEmpty()
    capacidad_asientos: number;

}
