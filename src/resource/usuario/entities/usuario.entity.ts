import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

import { Rol } from 'src/common/enums/rol.enum';

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

    @Column({ nullable: true })
    token_notificacion: string;

}
