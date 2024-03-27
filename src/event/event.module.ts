import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  imports: [MessagesService],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
