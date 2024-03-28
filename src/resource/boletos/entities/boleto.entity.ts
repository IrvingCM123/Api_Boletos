import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';

import { InformacionBoleto } from "src/resource/boletos_recursos/informacion_boleto/entities/informacion_boleto.entity";
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from "src/resource/viaje/viaje/entities/viaje.entity";

@Entity()
export class Boleto {

    @PrimaryGeneratedColumn()
    Id_Boleto: number;

    @Column()
    Asiento: string;

    @Column()
    Fecha_Reserva: string;

    @Column()
    Status: string;

    @Column()
    Precio: string;

    @Column()
    id_informacion_boleto: number;

    @Column()
    id_usuario: number;

    @Column()
    ID_Viaje: number;

}
