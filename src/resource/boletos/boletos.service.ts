import { Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { Boleto } from './entities/boleto.entity';
import {
  Errores_Boletos,
  Errores_USUARIO,
  Errores_Viaje,
} from 'src/common/helpers/Errores.service';
import {
  Exito_Boletos,
  Exito_Usuarios,
  Exito_Viaje,
} from 'src/common/helpers/Confirmaciones.service';

import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { InformacionBoleto } from 'src/resource/boletos_recursos/informacion_boleto/entities/informacion_boleto.entity';
import { InformacionBoletoService } from '../boletos_recursos/informacion_boleto/informacion_boleto.service';
@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private boletoRepository: Repository<Boleto>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    @InjectRepository(InformacionBoleto)
    private informacionBoletoRepository: Repository<InformacionBoleto>,
    private informacionBoletoService: InformacionBoletoService,
  ) {}

  async create(createBoletoDto: CreateBoletoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let validar_usuario: any = await this.validarUsuario(
      createBoletoDto.id_usuario,
    );
    let id_usuario = validar_usuario.id_usuario;

    let validar_viaje: any = await this.validarViaje(createBoletoDto.ID_Viaje);
    let ID_Viaje = validar_viaje.ID_Viaje;

    let validar_informacion_boleto: any = await this.validarInformacionBoleto(
      createBoletoDto.id_informacion_boleto,
    );
    let id_informacion_boleto =
      validar_informacion_boleto.id_informacion_boleto;

    try {
      let nuevo_boleto = {
        Asiento: createBoletoDto.Asiento,
        Fecha_Reserva: createBoletoDto.Fecha_Reserva,
        Status: createBoletoDto.Status,
        Precio: createBoletoDto.Precio,
        id_informacion_boleto: id_informacion_boleto,
        id_usuario: id_usuario,
        ID_Viaje: ID_Viaje,
      };

      this.boletoRepository.save(nuevo_boleto);
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_CREATED;
    }

    return Exito_Boletos.BOLETO_CREADO;
  }

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

  async validarViaje(ID_Viaje: any) {
    let buscar_viaje = await this.viajeRepository.findOne({
      where: { ID_Viaje: ID_Viaje },
    });

    if (buscar_viaje == null) {
      return Errores_Viaje.TRAVEL_NOT_FOUND;
    } else {
      return buscar_viaje;
    }
  }

  async validarInformacionBoleto(id_informacion_boleto: any) {
    let buscar_informacion_boleto =
      await this.informacionBoletoRepository.findOne({
        where: { id_informacion_boleto: id_informacion_boleto },
      });

    if (buscar_informacion_boleto == null) {
      return 'Informacion no encontrada';
    } else {
      return buscar_informacion_boleto;
    }
  }

  async findAll(user: User_Interface) {
    validateOwnershipAdmin(user);

    let informacion: any = {};

    let boletos: any = await this.boletoRepository.find();

    informacion.boletos = [];

    for (const boleto of boletos) {
      let boletoInfo: any = {};

      let buscarInformacionBoleto =
        await this.informacionBoletoRepository.findOne({
          where: { id_informacion_boleto: boleto.id_informacion_boleto },
        });

      boletoInfo.informacionBoleto = {
        id_informacion_boleto: buscarInformacionBoleto.id_informacion_boleto,
      };

      let buscarUsuario = await this.usuarioRepository.findOne({
        where: { id_usuario: boleto.id_usuario },
      });

      boletoInfo.usuario = {
        id_usuario: buscarUsuario.id_usuario,
        nombre: buscarUsuario.name,
        apellido: buscarUsuario.lastname,
        telefono: buscarUsuario.phone,
        direccion: buscarUsuario.address,
      };

      let viaje = await this.viajeRepository.findOne({
        where: { ID_Viaje: boleto.ID_Viaje },
      });

      boletoInfo.viaje = {
        ID_Viaje: viaje.ID_Viaje,
        Status: viaje.Status,
        Numero_Viaje: viaje.Numero_Servicio,
      };

      boletoInfo.boleto = {
        Id_Boleto: boleto.Id_Boleto,
        Asiento: boleto.Asiento,
        Fecha_Reserva: boleto.Fecha_Reserva,
        Status: boleto.Status,
        Precio: boleto.Precio,
      };

      informacion.boletos.push(boletoInfo);
    }

    let informacion_adicional = await this.informacionBoletoService.findOne(1, user);
    informacion.boletos.push(informacion_adicional);
    return informacion;
  }

  async findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    let boletos_viaje = await this.boletoRepository
      .createQueryBuilder('boleto')
      .leftJoinAndSelect('boleto.id_informacion_boleto', 'informacion_boleto')
      .leftJoinAndSelect('boleto.id_usuario', 'usuario')
      .leftJoinAndSelect('boleto.ID_Viaje', 'viaje')
      .where('boletos.ID_Viaje = :ID_Viaje', { id })
      .getMany();

    try {
      return this.boletoRepository.findOneById(id);
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_FOUND;
    }
  }

  update(id: number, updateBoletoDto: UpdateBoletoDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    let buscar_boleto: any = this.boletoRepository.findOne({
      where: { Id_Boleto: id },
    });

    if (buscar_boleto == null) {
      return Errores_Boletos.TICKET_NOT_FOUND;
    }

    try {
      //this.boletoRepository.update(id, updateBoletoDto);
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_UPDATED;
    }

    return Exito_Boletos.BOLETO_ACTUALIZADO;
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    let buscar_boleto: any = this.boletoRepository.findOne({
      where: { Id_Boleto: id },
    });

    if (buscar_boleto == null) {
      return Errores_Boletos.TICKET_NOT_FOUND;
    }

    try {
      this.boletoRepository.delete(id);
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_DELETED;
    }

    return Exito_Boletos.BOLETO_ELIMINADO;
  }
}
