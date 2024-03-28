import { Injectable } from '@nestjs/common';
import { CreateDocumentacionAbordajeDto } from './dto/create-documentacion_abordaje.dto';
import { UpdateDocumentacionAbordajeDto } from './dto/update-documentacion_abordaje.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { DocumentacionAbordaje } from './entities/documentacion_abordaje.entity';

@Injectable()
export class DocumentacionAbordajeService {

  constructor(
    @InjectRepository(DocumentacionAbordaje)
    private documentacionAbordajeRepository: Repository<DocumentacionAbordaje>
  ) {}

  create(createDocumentacionAbordajeDto: CreateDocumentacionAbordajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en el registro',
        data: this.documentacionAbordajeRepository.save(
          createDocumentacionAbordajeDto,
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
    return this.documentacionAbordajeRepository.find();
  }

  findOne(id: number , user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return this.documentacionAbordajeRepository.findOneById(id)
    } catch (error) {
      return {
        message: 'Dato no encontrado'
      };
    }
  }

  update(id: number, updateDocumentacionAbordajeDto: UpdateDocumentacionAbordajeDto, user: User_Interface) {
    validateOwnershipAdmin(user);
    try {
      return {
        message: 'Existo en la actualización',
        data: this.documentacionAbordajeRepository.update(id, updateDocumentacionAbordajeDto),
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
        data: this.documentacionAbordajeRepository.delete(id),
      };
    } catch (error) {
      return {
        message: 'Error al eliminar'
      };
    }
  }
}
