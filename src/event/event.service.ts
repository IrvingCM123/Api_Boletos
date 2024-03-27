import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { Event } from './entities/event.entity';
import { Errores_Incidentes } from 'src/common/helpers/Errores.service';

import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private messagesService: MessagesService,
  ) {}

  create(createEventDto: CreateEventDto, user: User_Interface) {
    validateOwnershipAdmin(user);

    try {
      //const event = this.eventRepository.create(createEventDto);
      //this.eventRepository.save(event);
      this.messagesService.sendNotification(user, ['token'], createEventDto);
      return;
    } catch (error) {
      throw new Error(Errores_Incidentes.EVENT_NOT_CREATED);
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
