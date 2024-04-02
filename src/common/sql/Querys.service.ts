import { Viaje } from '../../resource/viaje/viaje/entities/viaje.entity';
import { DetalleViaje } from 'src/resource/viaje/detalle_viaje/entities/detalle_viaje.entity';

import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SQL_ERRORS } from './SQL_Error.service';

@Injectable()
export class QuerysService {
    constructor(
        @InjectRepository(Viaje)
        private viajeRepository: Repository<Viaje>,
        @InjectRepository(DetalleViaje)
        private DetalleViajeRepository: Repository<DetalleViaje>,
        private sql_error: SQL_ERRORS,
    ) { }

    async Viaje_DetalleViaje_WithoutID() {
        return await this.viajeRepository
            .createQueryBuilder('viaje')
            .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
            .getMany();
    }

    async Viaje_DetalleViaje_WithID(id: number) {
        let result = await this.viajeRepository
            .createQueryBuilder('viaje')
            .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
            .where('viaje.ID_Viaje = :id', { id })
            .getMany();

        this.sql_error.RESULT_EMPTY(result);
        return result;
    }

    async Detalle_Viaje_OrigenDestino_WithoutID() {
        return await this.DetalleViajeRepository.createQueryBuilder('detalle_viaje')
            .leftJoinAndSelect('detalle_viaje.ID_Origen', 'origen')
            .leftJoinAndSelect('detalle_viaje.ID_Destino', 'destino')
            .getMany();
    }

    async Detalle_Viaje_OrigenDestino_WithID(id: number) {
        let result = await this.DetalleViajeRepository
            .createQueryBuilder('detalle_viaje')
            .leftJoinAndSelect('detalle_viaje.ID_Origen', 'origen')
            .leftJoinAndSelect('detalle_viaje.ID_Destino', 'destino')
            .where('detalle_viaje.ID_Detalle_Viaje = :id', { id })
            .getMany();

        this.sql_error.RESULT_EMPTY(result);
        return result;
    }
}
