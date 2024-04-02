import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
    Errores_Destinos,
} from 'src/common/helpers/Errores.service';

import { CatalogoDestino } from '../../catalogos/catalogo_destinos/entities/catalogo_destino.entity';
@Injectable()
export class Destination_Validation {
    constructor(
        @InjectRepository(CatalogoDestino)
        private destinationRepository: Repository<CatalogoDestino>,
    ) { }

    async Destination_Valitation(id_origin: any, id_destination: any) {
        let originID_number = parseInt(id_origin.toString());

        let destinationID_number = parseInt(id_destination.toString());

        await this.equal_ID(originID_number, destinationID_number)

        await this.validation_exists(originID_number, destinationID_number);

        return true;
    }

    equal_ID(id_origin: number, id_destination: number): void {
        if (id_origin == id_destination) {
            throw new Error(Errores_Destinos.DESTINOS_SAME);
        }
    }

    async validation_exists (id_origin: number, id_destination: number): Promise<void> {

        let search_destination = await this.destinationRepository.findOne({ 
            where: { id_catalogo_destino: id_destination }
        })

        if (search_destination == null || search_destination == undefined ) {
            throw new Error(Errores_Destinos.DESTINOS_NOT_FOUND);
        }

        let search_origin = await this.destinationRepository.findOne({
            where: { id_catalogo_destino: id_origin}
        });

        if (search_origin == null || search_destination == undefined) {
            throw new Error(Errores_Destinos.DESTINOS_NOT_FOUND);
        }
    }

}
