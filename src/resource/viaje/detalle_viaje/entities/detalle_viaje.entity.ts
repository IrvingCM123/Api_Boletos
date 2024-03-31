import { CatalogoDestino } from "src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class DetalleViaje {

    @PrimaryGeneratedColumn()
    id_detalle_viaje: number;

    @Column({ nullable: false })
    fecha_salida: string;

    @Column({ nullable: false })
    fecha_llegada: string;

    @Column({ nullable: false })
    precio: number;

    @Column({ nullable: false })
    hora_salida: string;

    @Column({ nullable: false })
    hora_llegada: string;

    @ManyToOne( () => CatalogoDestino, (destinos) => destinos.origen )
    origen: number;

    @ManyToOne( () => CatalogoDestino, (destinos) => destinos.destino )
    destino: number;
    
}
