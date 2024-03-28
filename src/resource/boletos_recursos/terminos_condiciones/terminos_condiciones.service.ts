import { Injectable } from '@nestjs/common';
import { CreateTerminosCondicioneDto } from './dto/create-terminos_condicione.dto';
import { UpdateTerminosCondicioneDto } from './dto/update-terminos_condicione.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { TerminosCondicione } from './entities/terminos_condicione.entity';

@Injectable()
export class TerminosCondicionesService {

  constructor(
    @InjectRepository(TerminosCondicione)
    private terminosCondicioneRepository: Repository<TerminosCondicione>
  ) {}

  create(createTerminosCondicioneDto: CreateTerminosCondicioneDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en el registro',
        data: this.terminosCondicioneRepository.save(
          createTerminosCondicioneDto,
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
    return this.terminosCondicioneRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return this.terminosCondicioneRepository.findOneById(id)
    } catch (error) {
      return {
        message: 'Dato no encontrado'
      };
    }
  }

  update(id: number, updateTerminosCondicioneDto: UpdateTerminosCondicioneDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la actualización',
        data: this.terminosCondicioneRepository.update(id, updateTerminosCondicioneDto),
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
        data: this.terminosCondicioneRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
