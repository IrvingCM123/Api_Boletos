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
import { DetalleViaje } from '../viaje/detalle_viaje/entities/detalle_viaje.entity';
import { CatalogoDestino } from '../catalogos/catalogo_destinos/entities/catalogo_destino.entity';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
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
    @InjectRepository(CatalogoDestino)
    private catalogoDestinoRepository: Repository<CatalogoDestino>,
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
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

    let boletos = await this.boletoRepository.find();

    try {
      let informacion = await this.obtener_informacion_boletos(boletos, user);
      return informacion;
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_FOUND;
    }
  }

  async findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      let boleto = await this.boletoRepository.findOne({
        where: { Id_Boleto: id },
      });

      if (boleto == null) {
        return Errores_Boletos.TICKET_NOT_FOUND;
      }

      let boleto_array = [];
      boleto_array.push(boleto);

      let informacion = await this.obtener_informacion_boletos(boleto_array,user,);

      return informacion;
    } catch (error) {
      return Errores_Boletos.TICKET_NOT_FOUND;
    }
  }

  async obtener_informacion_boletos(boletos: any, user: User_Interface) {
    let informacion: any = {};

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

      let viaje = await this.viajeRepository
        .createQueryBuilder('viaje')
        .leftJoinAndSelect('viaje.ID_Detalle_Viaje', 'detalle_viaje')
        .where('viaje.ID_Viaje = :ID_Viaje', { ID_Viaje: boleto.ID_Viaje })
        .getOne();

      let detalle_viaje = viaje.ID_Detalle_Viaje;

      let id_destino = parseInt(detalle_viaje.ID_Destino.toString());

      let destino = await this.catalogoDestinoRepository.findOne({
        where: { id_catalogo_destino: id_destino },
      });

      let id_origen = parseInt(detalle_viaje.ID_Origen.toString());

      let origen = await this.catalogoDestinoRepository.findOne({
        where: { id_catalogo_destino: id_origen },
      });

      boletoInfo.viaje = {
        ID_Viaje: viaje.ID_Viaje,
        Status: viaje.Status,
        Numero_Viaje: viaje.Numero_Servicio,
        Detalle_Viaje: {
          id_detalle_viaje: detalle_viaje.id_detalle_viaje,
          Fecha_Salida: detalle_viaje.fecha_salida,
          Fecha_Llegada: detalle_viaje.fecha_llegada,
          Hora_Salida: detalle_viaje.hora_salida,
          Hora_Llegada: detalle_viaje.hora_llegada,
          Origen: origen,
          Destino: destino,
          Precio: detalle_viaje.precio,
        },
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

    let informacion_adicional = await this.informacionBoletoService.findOne(
      1,
      user,
    );

    informacion.boletos.push(informacion_adicional);

    return informacion;
  }

  async buscar_boletos_email(email: string, user: User_Interface) {
    validateOwnershipAdmin(user);


    try {
    
      let buscar_cuenta = await this.cuentaRepository
      .createQueryBuilder('cuenta')
      .leftJoinAndSelect('cuenta.id_usuario', 'usuario')
      .where('cuenta.email = :email', { email })
      .getOne();

      let id_usuario = buscar_cuenta.id_usuario.id_usuario;

      let boletos: any = await this.boletoRepository.find({
        where: { id_usuario: id_usuario },
      });

      let boletos_array = [];

      for (const boleto of boletos) {
        boletos_array.push(boleto);
      }

      if (boletos_array.length == 0) {
        return 'Sin boletos disponibles';
      } else {
        let informacion = await this.obtener_informacion_boletos(
          boletos_array,
          user,
        );

        return informacion;
      }
    } catch (error) {
      return error;
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
      this.boletoRepository.update(id, updateBoletoDto);
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
