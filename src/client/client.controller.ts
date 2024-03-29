import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { Email_Interface } from 'src/common/interfaces/email.interface';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('email')
  create(@Body() Data: Email_Interface  ) {
    return this.clientService.enviarEmail(Data);
  }

}
