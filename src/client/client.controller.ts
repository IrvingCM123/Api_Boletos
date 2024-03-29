import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { Email_Interface } from 'src/common/interfaces/email.interface';
import { Response } from 'express'; // Importa Response desde express

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('email')
  create(@Body() Data: Email_Interface  ) {
    return this.clientService.enviarEmail(Data);
  }

  @Post('boleto') 
  async downloadBoleto(@Body() url: any, @Res() res: Response): Promise<void> {
    try {
      const urlImagen: string = url.url;
      const imageData = await this.clientService.Descargar_Boletos(urlImagen);
      res.set('Content-Type', 'image/jpeg');
      res.send(imageData);
    } catch (error) {
      res.status(500).send({ message: 'Error al descargar la imagen' });
    }
  }

}
