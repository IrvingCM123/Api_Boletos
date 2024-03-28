import { CondicionesBoleto } from './entities/condiciones_boleto.entity';
import { Injectable } from '@nestjs/common';
import { CreateCondicionesBoletoDto } from './dto/create-condiciones_boleto.dto';
import { UpdateCondicionesBoletoDto } from './dto/update-condiciones_boleto.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Injectable()
export class CondicionesBoletoService {

  constructor(
    @InjectRepository(CondicionesBoleto)
    private condicionesBoletoRepository: Repository<CondicionesBoleto>
  ) {}

  create(createCondicionesBoletoDto: CreateCondicionesBoletoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return {
        message: 'Existo en el registro',
        data: this.condicionesBoletoRepository.save(
          createCondicionesBoletoDto,
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
    return this.condicionesBoletoRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    
    try {
      return this.condicionesBoletoRepository.findOneById(id);
    } catch (error) {
      return {
        message: 'Dato no encontrado',
      };
    }
  }

  update(id: number, updateCondicionesBoletoDto: UpdateCondicionesBoletoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return {
        message: 'Existo en la actualización',
        data: this.condicionesBoletoRepository.update(id, updateCondicionesBoletoDto),
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
        data: this.condicionesBoletoRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar',
      };
    }
  }
}
