import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catalogo_vehiculo')
export class CatalogoVehiculo {
    @PrimaryGeneratedColumn()
    id_catalogo_vehiculo: number;

    @Column({ length: 30, unique: true})
    TipoVehiculo: string;

    @OneToMany(() => DetalleVehiculo, vehiculo => vehiculo.id_catalogo_vehiculo)
    vehiculo: DetalleVehiculo;
}
