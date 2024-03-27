import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Event]), MessagesModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
