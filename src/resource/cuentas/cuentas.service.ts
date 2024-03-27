import { Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';

import { Errores_Cuentas } from 'src/common/helpers/Errores.service';
import { Exito_Cuentas } from 'src/common/helpers/Confirmaciones.service';

import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/resource/usuario/usuario.service';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    private usuarioService: UsuarioService,
  ) {}

  create(createCuentaDto: CreateCuentaDto) {
    let buscar_cuenta = this.cuentaRepository.findOne({
      where: { email: createCuentaDto.email },
    });

    if (buscar_cuenta) {
      return Errores_Cuentas.CUENTA_ALREADY_EXISTS;
    } else {
      this.cuentaRepository.save(createCuentaDto);
      return Exito_Cuentas.CUENTA_CREADA;
    }
  }

  findAll() {
    return this.cuentaRepository.find();
  }

  async findOneByEmail(email: string) {
    let cuenta = await this.cuentaRepository.findOne({ where: { email } });
    if (cuenta) {
      //let usuario = await this.usuarioRepository.findOne({ where: { id_usuario: (await cuenta).id_usuario } });
      //console.log(usuario, "usuario", cuenta, "cuenta");
      return { cuenta };
    } else {
      return Errores_Cuentas.CUENTA_NOT_FOUND, false;
    }
  }

  async findByEmailWithPassword(email: string) {
    let buscar_cuenta = await this.cuentaRepository
      .createQueryBuilder('cuenta')
      .leftJoinAndSelect('cuenta.id_usuario', 'usuario')
      .where('cuenta.email = :email', { email })
      .getOne();

    if (buscar_cuenta) {
      let cuenta = {
        id_cuenta: buscar_cuenta.id_cuenta,
        email: buscar_cuenta.email,
        password: buscar_cuenta.password,
        status_cuenta: buscar_cuenta.status_cuenta,
        date_created: buscar_cuenta.date_created,
      };

      let info_usuario = buscar_cuenta.id_usuario;

      let usuario = {
        id_usuario: info_usuario.id_usuario,
        name: info_usuario.name,
        lastname: info_usuario.lastname,
        phone: info_usuario.phone,
        address: info_usuario.address,
        role: info_usuario.rol,
      };

      return { cuenta, usuario };
    } else {
      return Errores_Cuentas.CUENTA_NOT_FOUND, false;
    }
  }

  findOne(id: number) {
    try {
      return this.cuentaRepository.findOneById(id);
    } catch (error) {
      return Errores_Cuentas.CUENTA_NOT_FOUND;
    }
  }

  update(id: number, updateCuentaDto: UpdateCuentaDto) {
    return this.cuentaRepository.update(id, updateCuentaDto);
  }

  remove(id: number) {
    return this.cuentaRepository.delete(id);
  }
  y;
}
