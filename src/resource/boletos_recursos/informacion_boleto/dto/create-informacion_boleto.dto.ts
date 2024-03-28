import {
    IsNotEmpty,
    } from 'class-validator';

export class CreateInformacionBoletoDto {

    @IsNotEmpty()
    ID_Condiciones_Boleto:number[];

    @IsNotEmpty()
    ID_Datos_Emergencia: number[];

    @IsNotEmpty()
    ID_Informacion_Compañia: number[];

    @IsNotEmpty()
    ID_Documentacion_Abordaje: number[];

    @IsNotEmpty()
    ID_Instrucciones_Abordaje: number[];

    @IsNotEmpty()
    ID_Instrucciones_Seguridad: number[];

    @IsNotEmpty()
    ID_Terminos_Condiciones: number[];

}
