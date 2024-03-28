import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogoDestino {

    @PrimaryGeneratedColumn()
    id_catalogo_destino: number;

    @Column()
    Terminal: string;

    @Column()
    Ciudad: string;

    @Column()
    Estado: string;

    @Column()
    coordenadas: string;

}


