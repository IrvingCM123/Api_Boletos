import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Viaje } from '../../resource/viaje/viaje/entities/viaje.entity';

import {Errores_Conducores, Errores_USUARIO} from 'src/common/helpers/Errores.service';

import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
@Injectable()
export class Users_Validation {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, 
  ) {}

  async validarUsuario(id_usuario: any) {
    let buscar_usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id_usuario },
    });

    if (buscar_usuario == null) {
      return Errores_USUARIO.USUARIO_NOT_FOUND;
    } else {
      return buscar_usuario;
    }
  }

}
