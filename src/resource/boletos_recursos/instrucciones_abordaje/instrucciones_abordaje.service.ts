import { Injectable } from '@nestjs/common';
import { CreateInstruccionesAbordajeDto } from './dto/create-instrucciones_abordaje.dto';
import { UpdateInstruccionesAbordajeDto } from './dto/update-instrucciones_abordaje.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { InstruccionesAbordaje } from './entities/instrucciones_abordaje.entity';

@Injectable()
export class InstruccionesAbordajeService {

  constructor(
    @InjectRepository(InstruccionesAbordaje)
    private instruccionesAbordajeRepository: Repository<InstruccionesAbordaje>
  ) {}

  create(createInstruccionesAbordajeDto: CreateInstruccionesAbordajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en el registro',
        data: this.instruccionesAbordajeRepository.save(
          createInstruccionesAbordajeDto,
        ),
      };
    } catch (error) {
      return {
        message: 'Error al registrar',
      };
    }
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.instruccionesAbordajeRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return this.instruccionesAbordajeRepository.findOneById(id)
    } catch (error) {
      return {
        message: 'Dato no encontrado'
      };
    }
  }

  update(id: number, updateInstruccionesAbordajeDto: UpdateInstruccionesAbordajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la actualización',
        data: this.instruccionesAbordajeRepository.update(id, updateInstruccionesAbordajeDto),
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
        data: this.instruccionesAbordajeRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
