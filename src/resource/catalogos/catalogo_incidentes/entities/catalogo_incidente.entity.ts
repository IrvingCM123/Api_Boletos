import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogoIncidente {
    @PrimaryGeneratedColumn()
    id_incidente: number;

    @Column({ nullable: false, unique: true})
    Tipo_Incidente: string;
}
