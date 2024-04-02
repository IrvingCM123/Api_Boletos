import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { CatalogoVehiculo } from './../../../catalogos/catalogo_vehiculos/entities/catalogo_vehiculo.entity';
import {
        Column,
        Entity,
        JoinColumn,
        ManyToMany,
        ManyToOne,
        OneToMany,
        OneToOne,
        PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DetalleVehiculo {
        @PrimaryGeneratedColumn()
        id_detalle_vehiculo: number;

        @Column({ nullable: false })
        marca: string;

        @Column({ nullable: false })
        modelo: string;

        @Column({ nullable: false })
        numero_placas: string;

        @ManyToOne(() => CatalogoVehiculo, (tipo) => tipo.vehiculo)
        id_catalogo_vehiculo: number;

        @Column({ nullable: false })
        capacidad_asientos: number;

        @OneToMany(() => Viaje, (viaje) => viaje.ID_Detalle_Vehiculo)
        viajes: Viaje[];
}
