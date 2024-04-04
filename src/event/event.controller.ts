import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { UpdateEventDto } from './dto/update-event.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { ActiveUser } from 'src/common/decorators/user.decorator';

/**
 * Controller to manage events.
 */
@Auth(Rol.ADMIN)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

    /**
   * Creates a new event.
   * @param data Data of the event to create.
   * @param user Active user making the request.
   */
  @Post()
  create(@Body() data: any, @ActiveUser() user: User_Interface){
    return this.eventService.create(data, user);
  }

    /**
   * Retrieves all events.
   * @param user Active user making the request.
   */
  @Get()
  findAll( @ActiveUser() user: User_Interface) {
    return this.eventService.findAll(user);
  }

    /**
   * Retrieves an event by its ID.
   * @param id ID of the event to find.
   * @param user Active user making the request.
   */
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.eventService.findOne(+id, user);
  }

    /**
   * Updates an existing event.
   * @param id ID of the event to update.
   * @param updateEventDto Updated data of the event.
   * @param user Active user making the request.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @ActiveUser() user: User_Interface) {
    return this.eventService.update(+id, updateEventDto, user);
  }

    /**
   * Removes an existing event.
   * @param id ID of the event to remove.
   * @param user Active user making the request.
   */
  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.eventService.remove(+id, user);
  }
}
