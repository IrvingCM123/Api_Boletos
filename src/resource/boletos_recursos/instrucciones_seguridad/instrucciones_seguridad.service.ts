import { Injectable } from '@nestjs/common';
import { CreateInstruccionesSeguridadDto } from './dto/create-instrucciones_seguridad.dto';
import { UpdateInstruccionesSeguridadDto } from './dto/update-instrucciones_seguridad.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { InstruccionesSeguridad } from './entities/instrucciones_seguridad.entity';

@Injectable()
export class InstruccionesSeguridadService {
  constructor(
    @InjectRepository(InstruccionesSeguridad)
    private instruccionesSeguridadRepository: Repository<InstruccionesSeguridad>,
  ) {}

  create(
    createInstruccionesSeguridadDto: CreateInstruccionesSeguridadDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en el registro',
        data: this.instruccionesSeguridadRepository.save(
          createInstruccionesSeguridadDto,
        ),
      };
    } catch (error) {
      return {
        message: 'Error al registrar',
      };
    }
  }

  findAll(user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.instruccionesSeguridadRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.instruccionesSeguridadRepository.findOneById(id);
  }

  update(
    id: number,
    updateInstruccionesSeguridadDto: UpdateInstruccionesSeguridadDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la actualización',
        data: this.instruccionesSeguridadRepository.update(
          id,
          updateInstruccionesSeguridadDto,
        ),
      };
    } catch (error) {
      return {
        message: 'Error al actualizar',
      };
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la eliminación',
        data: this.instruccionesSeguridadRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
