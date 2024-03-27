
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne } from 'typeorm';


import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';
import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';

@Entity()
export class Viaje {

    @PrimaryGeneratedColumn()
    ID_Viaje: number;

    @OneToOne(() => DetalleViaje)
    @JoinColumn({ name: 'id_detalle_viaje' })
    ID_Detalle_Viaje: DetalleViaje;

    @ManyToMany(() => Conductore)
    @JoinColumn({ name: 'id_conductor' })
    ID_Conductor: Conductore;

    @OneToOne(() => DetalleVehiculo)
    @JoinColumn({ name: 'id_detalle_vehiculo' })
    ID_Detalle_Vehiculo: DetalleVehiculo;

    @Column({ nullable: false })
    Status: string;

    @Column({ nullable: false })
    Numero_Servicio: string;

    @Column({ nullable: false })
    Asientos_Disponibles: number;

    @Column({ nullable: false })
    Asientos_Ocupados: number;

}
