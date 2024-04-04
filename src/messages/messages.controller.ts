import {
  Controller,
  Get,
  Post,
  Body
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { Message_Interface } from 'src/common/interfaces/message.interface';

@Auth(Rol.ADMIN)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  // Method to send a notification
  @Post()
  sendNotification(
    @Body() Datos: Message_Interface,
    Token: string[],
    @ActiveUser() user: User_Interface,
  ) {
    return this.messagesService.sendNotification(Datos, Token, user);
  }
  // Method to get Firebase token
  @Get('token')
  getFirebaseToken(@ActiveUser() user: User_Interface) {
    return this.messagesService.getAccessToken(user);
  }
}
