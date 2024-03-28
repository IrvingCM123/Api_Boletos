import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instrucciones_abordaje')
export class InstruccionesAbordaje {

    @PrimaryGeneratedColumn()
    id_instrucciones_abordaje: number;
    
    @Column()
    Instruccion: string;

}
