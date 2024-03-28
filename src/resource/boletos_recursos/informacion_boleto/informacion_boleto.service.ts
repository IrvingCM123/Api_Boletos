import { Injectable } from '@nestjs/common';
import { CreateInformacionBoletoDto } from './dto/create-informacion_boleto.dto';
import { UpdateInformacionBoletoDto } from './dto/update-informacion_boleto.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { plainToClass } from 'class-transformer';

import { InformacionBoleto } from './entities/informacion_boleto.entity';

@Injectable()
export class InformacionBoletoService {

  constructor(
    @InjectRepository(InformacionBoleto)
    private informacionBoletoRepository: Repository<InformacionBoleto>
  ) {}

  async create(createInformacionBoletoDto: CreateInformacionBoletoDto, user: User_Interface) {
    
    validateOwnershipAdmin(user);
    
    try {
      // Convertir el DTO a un objeto de tipo InformacionBoleto
      const informacionBoleto = plainToClass(
        InformacionBoleto,
        createInformacionBoletoDto,
      );

      return await this.informacionBoletoRepository.save(informacionBoleto);
    } catch (error) {
      throw new Error('No se pudo crear la información del boleto.');
    }
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.informacionBoletoRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    
    try {
      return this.informacionBoletoRepository.findOneById(id)
    } catch (error) {
      return {
        message: 'Error al registrar'
      };
    }
  }

  async update(id: number, updateInformacionBoletoDto: UpdateInformacionBoletoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      const informacionBoleto = plainToClass(
        InformacionBoleto,
        updateInformacionBoletoDto,
      );

      return {
        message: 'Existo en la actualización',
        data: await this.informacionBoletoRepository.update(id, informacionBoleto),
      };
    } catch (error) {
      return {
        message: 'Error al actualizar'
      };
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la eliminación',
        data: this.informacionBoletoRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar'
      };
    }
  }
}
