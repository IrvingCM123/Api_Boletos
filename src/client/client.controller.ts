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
      const urlImagen: string = url.url; // Suponiendo que el objeto `url` tiene una propiedad `url` que contiene la URL de la imagen
      const imageData = await this.clientService.Descargar_Boletos(urlImagen);
      res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según el tipo de imagen
      res.send(imageData);
    } catch (error) {
      res.status(500).send({ message: 'Error al descargar la imagen' });
    }
  }

}
