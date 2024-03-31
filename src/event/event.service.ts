import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { Event } from './entities/event.entity';
import {
  Errores_Incidentes,
  Errores_Conducores,
  Errores_Viaje,
} from 'src/common/helpers/Errores.service';

import { MessagesService } from 'src/messages/messages.service';

import { Conductore } from 'src/resource/conductores/entities/conductore.entity';
import { Viaje } from 'src/resource/viaje/viaje/entities/viaje.entity';
import { DetalleVehiculo } from 'src/resource/transportes/detalle_vehiculos/entities/detalle_vehiculo.entity';
import { Boleto } from 'src/resource/boletos/entities/boleto.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private messagesService: MessagesService,
    @InjectRepository(Conductore)
    private conductoresRepository: Repository<Conductore>,
    @InjectRepository(Viaje)
    private viajeRepository: Repository<Viaje>,
    @InjectRepository(DetalleVehiculo)
    private detalleVehiculoRepository: Repository<DetalleVehiculo>,
    @InjectRepository(Boleto)
    private boletoRepository: Repository<Boleto>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(data: any, user: User_Interface) {

    validateOwnershipAdmin(user);

    let licencia_conductor = data.licencia_conductor;
    console.log(data)

    try {
      const conductor = await this.ValidarConductor(licencia_conductor);

      const viaje = await this.Buscar_Viaje(conductor);

      const boletos = await this.Buscar_Boletos(viaje);

      //this.messagesService.sendNotification('token', createEventDto, user);
      return;
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_CREATED);
    }
  }

  async ValidarConductor(licencia_conductor: string) {
    const conductor: any = await this.conductoresRepository.findOne({
      where: { Licencia: licencia_conductor },
    });

    if (!conductor) {
      throw new Error(Errores_Conducores.DRIVER_NOT_FOUND);
    }

    const id_conductor = parseInt(conductor.id_conductor.toString());

    return id_conductor;
  }

  async Buscar_Viaje(conductor_ID: any) {
    try {
      const viaje: any = await this.viajeRepository
        .createQueryBuilder('viaje')
        .leftJoinAndSelect('viaje.ID_Conductor', 'conductores')
        .where('viaje.ID_Conductor = :ID_Conductor', {
          ID_Conductor: conductor_ID,
        })
        .getMany();

      if (!viaje) {
        throw new Error(Errores_Incidentes.EVENT_NOT_FOUND);
      }

      return viaje[0].ID_Viaje;
    } catch (error) {
      throw new Error(Errores_Viaje.TRAVEL_NOT_FOUND);
    }
  }

  async Buscar_Boletos(id_viaje: number) {
    try {
      
      const boletos: any = await this.boletoRepository.
      createQueryBuilder('boleto')
      .leftJoinAndSelect('boleto.viajeID', 'viaje' )
      .leftJoinAndSelect('boleto.id_usuario', 'usuario' )
      .where('boleto.viajeID = :viajeID', {
        viajeID: id_viaje,
      })
      .getMany();

      if (!boletos) {
        throw new Error(Errores_Incidentes.EVENT_NOT_FOUND);
      }

      let boletos_array = [];

      for (let i = 0; i < boletos.length; i++) {
        boletos_array.push(boletos[i].id_usuario.id_usuario);
      }
      console.log(boletos_array, 'boletos');
      return boletos_array;
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_FOUND);
    }
  }


  findAll(user: User_Interface) {
    validateOwnershipAdmin(user);
    return this.eventRepository.find();
  }

  findOne(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.eventRepository.findOneById(id);
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_FOUND);
    }
  }

  update(id: number, updateEventDto: UpdateEventDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.eventRepository.update(id, updateEventDto);
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_UPDATED);
    }
  }

  remove(id: number, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      return this.eventRepository.delete(id);
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_DELETED);
    }
  }
}
