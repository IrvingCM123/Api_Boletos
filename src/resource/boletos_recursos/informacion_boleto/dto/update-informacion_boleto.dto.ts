import { PartialType } from '@nestjs/mapped-types';
import { CreateInformacionBoletoDto } from './create-informacion_boleto.dto';

import { InformacionBoleto } from '../entities/informacion_boleto.entity';
import { CondicionesBoleto } from '../../condiciones_boleto/entities/condiciones_boleto.entity';
import { DatosEmergencia } from '../../datos_emergencia/entities/datos_emergencia.entity';
import { InformacionCompañia } from '../../informacion_compañia/entities/informacion_compañia.entity';
import { DocumentacionAbordaje } from '../../documentacion_abordaje/entities/documentacion_abordaje.entity';
import { InstruccionesAbordaje } from '../../instrucciones_abordaje/entities/instrucciones_abordaje.entity';
import { InstruccionesSeguridad } from '../../instrucciones_seguridad/entities/instrucciones_seguridad.entity';
import { TerminosCondicione } from './../../terminos_condiciones/entities/terminos_condicione.entity';
import { IsNotEmpty } from 'class-validator';


export class UpdateInformacionBoletoDto extends PartialType(CreateInformacionBoletoDto) {

    @IsNotEmpty()
    ID_Informacion_Boleto: InformacionBoleto;

    @IsNotEmpty()
    id_condicion_boleto: CondicionesBoleto;

    @IsNotEmpty()
    id_dato_emergencia: DatosEmergencia;

    @IsNotEmpty()
    id_informacion_compañia: InformacionCompañia;

    @IsNotEmpty()
    id_documentacion_abordaje: DocumentacionAbordaje;

    @IsNotEmpty()
    id_instrucciones_abordaje: InstruccionesAbordaje;

    @IsNotEmpty()
    id_instrucciones_seguridad: InstruccionesSeguridad;

    @IsNotEmpty()
    id_terminos_condiciones: TerminosCondicione;

}
