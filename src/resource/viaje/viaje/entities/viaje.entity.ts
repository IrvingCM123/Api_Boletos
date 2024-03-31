
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';


import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';
import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { CatalogoDestino } from 'src/resource/catalogos/catalogo_destinos/entities/catalogo_destino.entity';
import { Boleto } from 'src/resource/boletos/entities/boleto.entity';

@Entity()
export class Viaje {

    @PrimaryGeneratedColumn()
    ID_Viaje: number;

    @OneToOne(() => DetalleViaje)
    @JoinColumn({ name: 'id_detalle_viaje' })
    ID_Detalle_Viaje: DetalleViaje;

    @ManyToOne(() => Conductore, (conductore) => conductore.viajes)
    ID_Conductor: Conductore;

    @ManyToOne(() => DetalleVehiculo, (vehiculo) => vehiculo.viajes)
    ID_Detalle_Vehiculo: DetalleVehiculo;

    @Column({ nullable: false })
    Status: string;

    @Column({ nullable: false })
    Numero_Servicio: string;

    @Column({ nullable: false })
    Asientos_Disponibles: number;

    @Column({ nullable: false })
    Asientos_Ocupados: number;   

    @OneToMany(() => Boleto, (boleto) => boleto.viajeID)
    boletos: Boleto[];


}
