import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class CondicionesBoleto {

    @PrimaryGeneratedColumn()
    id_condicion_boleto: number;

    @Column()
    condicion: string;

}
