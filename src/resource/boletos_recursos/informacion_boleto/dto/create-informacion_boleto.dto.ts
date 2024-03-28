import {
    IsNotEmpty,
    } from 'class-validator';

import { CondicionesBoleto } from '../../condiciones_boleto/entities/condiciones_boleto.entity';
import { DatosEmergencia } from '../../datos_emergencia/entities/datos_emergencia.entity';
import { InformacionCompañia } from '../../informacion_compañia/entities/informacion_compañia.entity';
import { DocumentacionAbordaje } from '../../documentacion_abordaje/entities/documentacion_abordaje.entity';
import { InstruccionesAbordaje } from '../../instrucciones_abordaje/entities/instrucciones_abordaje.entity';
import { InstruccionesSeguridad } from '../../instrucciones_seguridad/entities/instrucciones_seguridad.entity';
import { TerminosCondicione } from './../../terminos_condiciones/entities/terminos_condicione.entity';

export class CreateInformacionBoletoDto {

    @IsNotEmpty()
    ID_Condiciones_Boleto: CondicionesBoleto[];

    @IsNotEmpty()
    ID_Datos_Emergencia: DatosEmergencia[];

    @IsNotEmpty()
    ID_Informacion_Compañia: InformacionCompañia[];

    @IsNotEmpty()
    ID_Documentacion_Abordaje: DocumentacionAbordaje[];

    @IsNotEmpty()
    ID_Instrucciones_Abordaje: InstruccionesAbordaje[];

    @IsNotEmpty()
    ID_Instrucciones_Seguridad: InstruccionesSeguridad[];

    @IsNotEmpty()
    ID_Terminos_Condiciones: TerminosCondicione[];

}
