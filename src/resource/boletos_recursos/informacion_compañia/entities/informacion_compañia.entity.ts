import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('informacion_compañia')
export class InformacionCompañia {

    @PrimaryGeneratedColumn()
    id_informacion_compañia: number;

    @Column()
    Nombre_Compañia: string;

    @Column()
    Direccion: string;

    @Column()
    Telefono: string;

    @Column()
    Correo: string;

    @Column()
    Sitio_Web: string;

}
