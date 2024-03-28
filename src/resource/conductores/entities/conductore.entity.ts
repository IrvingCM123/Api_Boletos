import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import { Usuario } from 'src/resource/usuario/entities/usuario.entity';

@Entity( 'conductores' )
export class Conductore {

    @PrimaryGeneratedColumn()
    id_conductor: number;

    @Column({ nullable: false })
    Licencia: string;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'}) 
    id_usuario: Usuario;

}
