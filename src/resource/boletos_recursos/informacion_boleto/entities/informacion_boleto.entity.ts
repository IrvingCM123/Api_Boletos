import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CondicionesBoleto } from '../../condiciones_boleto/entities/condiciones_boleto.entity';
import { DatosEmergencia } from '../../datos_emergencia/entities/datos_emergencia.entity';
import { InformacionCompañia } from '../../informacion_compañia/entities/informacion_compañia.entity';
import { DocumentacionAbordaje } from '../../documentacion_abordaje/entities/documentacion_abordaje.entity';
import { InstruccionesAbordaje } from '../../instrucciones_abordaje/entities/instrucciones_abordaje.entity';
import { InstruccionesSeguridad } from '../../instrucciones_seguridad/entities/instrucciones_seguridad.entity';
import { TerminosCondicione } from './../../terminos_condiciones/entities/terminos_condicione.entity';

@Entity()
export class InformacionBoleto {

    @PrimaryGeneratedColumn()
    id_informacion_boleto: number;

    @ManyToMany(() => CondicionesBoleto)
    @JoinColumn({ name: 'id_condicion_boleto' })
    id_condicion_boleto: CondicionesBoleto[];

    @ManyToMany(() => DatosEmergencia)
    @JoinColumn({ name: 'id_dato_emergencia' })
    id_dato_emergencia: DatosEmergencia[];

    @ManyToMany(() => InformacionCompañia)
    @JoinColumn({ name: 'id_informacion_compañia' })
    id_informacion_compañia: InformacionCompañia[];

    @ManyToMany(() => DocumentacionAbordaje)
    @JoinColumn({ name: 'id_documentacion_abordaje' })
    id_documentacion_abordaje: DocumentacionAbordaje[];

    @ManyToMany(() => InstruccionesAbordaje)
    @JoinColumn({ name: 'id_instrucciones_abordaje' })
    id_instrucciones_abordaje: InstruccionesAbordaje[];

    @ManyToMany(() => InstruccionesSeguridad)
    @JoinColumn({ name: 'id_instrucciones_seguridad' })
    id_instrucciones_seguridad: InstruccionesSeguridad[];

    @ManyToMany(() => TerminosCondicione)
    @JoinColumn({ name: 'id_terminos_condiciones' })
    id_terminos_condiciones: TerminosCondicione[];

}
