import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InformacionBoleto {

    @PrimaryGeneratedColumn()
    id_informacion_boleto: number;

    @Column({ type: 'integer', array: true, default: [] })
    id_condicion_boleto: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_dato_emergencia: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_informacion_compañia: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_documentacion_abordaje: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_instrucciones_abordaje: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_instrucciones_seguridad: number[];

    @Column({ type: 'integer', array: true, default: [] })
    id_terminos_condiciones: number[];

}
