import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documentacion_abordaje')
export class DocumentacionAbordaje {
    @PrimaryGeneratedColumn()
    id_documentacion_abordaje: number;
    
    @Column()
    Documento: string;
}
