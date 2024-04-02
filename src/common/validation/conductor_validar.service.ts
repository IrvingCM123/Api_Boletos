import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from '../../resource/viaje/viaje/entities/viaje.entity';

import {Errores_Conducores} from 'src/common/helpers/Errores.service';

import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
@Injectable()
export class Drivers_Validation {
  constructor(
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    @InjectRepository(Conductore)
    private conductoreRepository: Repository<Conductore>,    
  ) {}

  async Validar_Conductores(id_conductor: any) {
    let conductor_string = id_conductor.toString();
    let conductor_number = parseInt(conductor_string);

    let buscar_conductor: any = await this.conductoreRepository.findOne({
      where: { id_conductor: conductor_number },
    });

    if (buscar_conductor == null) {
      throw new Error(Errores_Conducores.DRIVER_NOT_FOUND);
    }

    return true;
  }

  async Conductores_Viaje(id_conductor) {

    const viaje: any = await this.viajeRepository
    .createQueryBuilder('viaje')
    .leftJoinAndSelect('viaje.ID_Conductor', 'conductores')
    .where('viaje.ID_Conductor = :ID_Conductor', {
      ID_Conductor: id_conductor,
    })
    .getMany();

    console.log(viaje)
    
  }
}
