import { Injectable } from '@nestjs/common';
import { CreateDatosEmergenciaDto } from './dto/create-datos_emergencia.dto';
import { UpdateDatosEmergenciaDto } from './dto/update-datos_emergencia.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';

import { DatosEmergencia } from './entities/datos_emergencia.entity';


@Injectable()
export class DatosEmergenciaService {

  constructor(
    @InjectRepository(DatosEmergencia)
    private datosEmergenciaRepository: Repository<DatosEmergencia>
  ) {}

  create(createDatosEmergenciaDto: CreateDatosEmergenciaDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en el registro',
        data: this.datosEmergenciaRepository.save(
          createDatosEmergenciaDto,
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
    return this.datosEmergenciaRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    
    try {
      return this.datosEmergenciaRepository.findOneById(id)
    } catch (error) {
      return {
        message: 'Error al registrar'
      };
    }
  }

  update(id: number, updateDatosEmergenciaDto: UpdateDatosEmergenciaDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la actualización',
        data: this.datosEmergenciaRepository.update(id, updateDatosEmergenciaDto),
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
        data: this.datosEmergenciaRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
