import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { Estado } from 'src/common/enums/rol.enum';

@Entity()
export class Cuenta {

    @PrimaryGeneratedColumn()
    id_cuenta: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', default: Estado.ACTIVO, enum: Estado })
    status_cuenta: string;

    @Column({ nullable: false })
    date_created: Date;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' }) 
    id_usuario: Usuario; 
}
