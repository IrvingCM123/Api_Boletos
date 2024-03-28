import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DatosEmergencia {

    @PrimaryGeneratedColumn()
    id_dato_emergencia: number;

    @Column()
    Nombre: string;

    @Column()
    Descripcion: string;

}
