import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('terminos_condiciones')
export class TerminosCondicione {

    @PrimaryGeneratedColumn()
    id_terminos_condiciones: number;
    
    @Column()
    terminos_condiciones: string;

}
