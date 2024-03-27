import { CatalogoVehiculo } from './../../../catalogos/catalogo_vehiculos/entities/catalogo_vehiculo.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    
        @ManyToMany(() => CatalogoVehiculo)
        @JoinColumn({ name: 'id_catalogo_vehiculo' })
        id_catalogo_vehiculo: CatalogoVehiculo;

        @Column({ nullable: false })
        capacidad_asientos: number;
}
