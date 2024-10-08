import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { Message_Interface } from 'src/common/interfaces/message.interface';

@Auth(Rol.ADMIN)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendNotification(@Body() Datos: Message_Interface,Token: string[], @ActiveUser() user: User_Interface) {
    return this.messagesService.sendNotification(Datos,Token, user);
  }

  @Get('token')
  getFirebaseToken(@ActiveUser() user: User_Interface) {
    return this.messagesService.getAccessToken(user);
  }
}
