import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instrucciones_seguridad')
export class InstruccionesSeguridad {

    @PrimaryGeneratedColumn()
    id_instrucciones_seguridad: number;
    
    @Column()
    Instruccion: string;

}
