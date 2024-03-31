import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => DetalleViaje, (destinos) => destinos.origen)
    origen: DetalleViaje[];

    @OneToMany(() => DetalleViaje, (destinos) => destinos.destino)
    destino: DetalleViaje[];

}


