import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';

import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';

@Entity( 'conductores' )
export class Conductore {

    @PrimaryGeneratedColumn()
    id_conductor: number;

    @Column({ nullable: false })
    Licencia: string;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'}) 
    id_usuario: Usuario;

    @OneToMany(() => Viaje, (viaje) => viaje.ID_Conductor)
    viajes: Viaje[];

}
