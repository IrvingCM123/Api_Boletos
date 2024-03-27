import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id_evento: number;

    @Column({ nullable: false })
    Evento: string;

    @Column({ nullable: true })
    Lugar: string;

    @Column({ nullable: false })
    Viaje: string;

    @Column({ nullable: true })
    Hora_Reprogramada: string;

    @Column({ nullable: true })
    Imagen?: string | null;

    @Column({ nullable: true })
    Descripcion: string;

    @Column({ nullable: true })
    Titulo: string;

}
