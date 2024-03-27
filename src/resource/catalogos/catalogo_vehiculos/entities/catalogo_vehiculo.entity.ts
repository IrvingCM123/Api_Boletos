import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catalogo_vehiculo')
export class CatalogoVehiculo {
    @PrimaryGeneratedColumn()
    id_catalogo_vehiculo: number;

    @Column({ length: 30, unique: true})
    TipoVehiculo: string;
}
