import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogoCategoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column({ length: 20, nullable: false, })
    categoria: string;

    @Column({ length: 5, nullable: false, })
    codigo: string;
}
