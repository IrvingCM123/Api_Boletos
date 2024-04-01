import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from 'typeorm';

import { Rol } from 'src/common/enums/rol.enum';
import { Boleto } from 'src/resource/boletos/entities/boleto.entity';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    address: string;

    @Column({ type: 'enum', default: Rol.ADMIN, enum: Rol })
    rol: Rol;

    @Column({ nullable: true, unique: true})
    token_notificacion: string;

    @OneToMany(() => Boleto, (boleto) => boleto.id_usuario)
    boletos: Boleto[];

}
