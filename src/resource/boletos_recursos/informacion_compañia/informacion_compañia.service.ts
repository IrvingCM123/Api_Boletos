import { Injectable } from '@nestjs/common';
import { CreateInformacionCompañiaDto } from './dto/create-informacion_compañia.dto';
import { UpdateInformacionCompañiaDto } from './dto/update-informacion_compañia.dto';

import { InformacionCompañia } from './entities/informacion_compañia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { Errores_Catalogos } from 'src/common/helpers/Errores.service';
import { Exito_Catalogos } from 'src/common/helpers/Confirmaciones.service';

@Injectable()
export class InformacionCompañiaService {
  constructor(
    @InjectRepository(InformacionCompañia)
    private informacionCompañiaRepository: Repository<InformacionCompañia>,
  ) {}

  create(
    createInformacionCompañiaDto: CreateInformacionCompañiaDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    try {
      return {
        message: 'Existo en el registro',
        data: this.informacionCompañiaRepository.save(
          createInformacionCompañiaDto,
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
    return this.informacionCompañiaRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    
    try {
      return this.informacionCompañiaRepository.findOneById(id);
    } catch (error) {
      return {
        message: 'Dato no encontrado',
      };
    }
  }

  update(
    id: number,
    updateInformacionCompañiaDto: UpdateInformacionCompañiaDto,
    user: User_Interface,
  ) {
    validateOwnershipAdmin(user);

    try {
      return {
        message: 'Existo en la actualización',
        data: this.informacionCompañiaRepository.update(
          id,
          updateInformacionCompañiaDto,
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
        message: 'Existo eliminado',
        data: this.informacionCompañiaRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
