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
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { ActiveUser } from 'src/common/decorators/user.decorator';

@Auth(Rol.ADMIN)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @ActiveUser() user: User_Interface){
    return this.eventService.create(createEventDto, user);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.eventService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @ActiveUser() user: User_Interface) {
    return this.eventService.update(+id, updateEventDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.eventService.remove(+id, user);
  }
}
