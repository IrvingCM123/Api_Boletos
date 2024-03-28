import { Injectable } from '@nestjs/common';
import { CreateConductoreDto } from './dto/create-conductore.dto';
import { UpdateConductoreDto } from './dto/update-conductore.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { Conductore } from './entities/conductore.entity';

import { Errores_Conducores, Errores_USUARIO, Errores_Cuentas } from 'src/common/helpers/Errores.service';
import { Exito_Conductores } from 'src/common/helpers/Confirmaciones.service';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Cuenta } from '../cuentas/entities/cuenta.entity';

@Injectable()
export class ConductoresService {

  constructor(
    @InjectRepository(Conductore)
    private conductoreRepository: Repository<Conductore>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>
  ) {}

  async create(createConductoreDto: CreateConductoreDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let buscar_conductor :any = await this.conductoreRepository.findOne({
      where: { Licencia: createConductoreDto.Licencia },
    });

    if (buscar_conductor != null) {
      return Errores_Conducores.DRIVER_ALREADY_EXISTS;
    }

    let buscar_email :any = await this.cuentaRepository.findOne({
      where: { email: createConductoreDto.email },
    });

    if (buscar_email == null) {
      return Errores_Cuentas.CUENTA_NOT_FOUND;
    }

    let email = buscar_email.email;

    let buscar_cuenta = await this.cuentaRepository
    .createQueryBuilder('cuenta')
    .leftJoinAndSelect('cuenta.id_usuario', 'usuario')
    .where('cuenta.email = :email', { email })
    .getOne();

    let conductor: any = {
      Licencia: createConductoreDto.Licencia,
      id_usuario: buscar_cuenta.id_usuario.id_usuario,
    }

    if (buscar_cuenta.id_usuario == null) {
      return Errores_USUARIO.USUARIO_NOT_FOUND;
    } else {
      this.conductoreRepository.save(conductor);
      return Exito_Conductores.CONDUCTOR_CREADO;
    }
  }

  findAll( user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.conductoreRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.conductoreRepository.findOneById(id);
    } catch (error) {
      return Errores_Conducores.DRIVER_NOT_FOUND;
    }
    
  }

  update(id: number, updateConductoreDto: UpdateConductoreDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.conductoreRepository.update(id, updateConductoreDto);
      return Exito_Conductores.CONDUCTOR_ACTUALIZADO;
    } catch (error) {
      return Errores_Conducores.DRIVER_NOT_FOUND;
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      this.conductoreRepository.delete(id);
      return Exito_Conductores.CONDUCTOR_ELIMINADO;
    } catch (error) {
      return Errores_Conducores.DRIVER_NOT_FOUND;
    }
  }
}
