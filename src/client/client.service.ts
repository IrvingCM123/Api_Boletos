import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Email_Interface } from 'src/common/interfaces/email.interface';
import * as dotenv from 'dotenv';

@Injectable()
export class ClientService {
  constructor() {
    dotenv.config();
  }

  async enviarEmail(
    Destinatario: string,
    Data: Email_Interface,
  ): Promise<string> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: require('dotenv').config(process.env.EMAIL_USER),
          pass: require('dotenv').config(process.env.EMAIL_PASS),
        },
      });

      const emailUser: any = require('dotenv').config(process.env.EMAIL_USER);
      const emailPass = process.env.EMAIL_PASS;

      console.log(emailUser, 'dawd');

      console.log(transporter);

      const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2; /* Color de fondo */
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px; /* Bordes redondeados */
            background-color: #fff; /* Color de fondo del contenedor */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Sombra */
          }
          .header {
            text-align: center;
            color: #333; /* Color del encabezado */
            font-size: 24px; /* Tamaño del texto del encabezado */
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 20px;
            color: #666; /* Color del texto de información */
          }
          .info p {
            margin: 5px 0;
          }
          .download-link {
            text-align: center;
          }
          .image-container {
            text-align: center;
            margin-top: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>¡Ya tienes tu boleto de autobús!</h2>
          </div>
          <div class="info">
            <p>Hola ${Data.Nombre_Usuario}!</p>
            <p>Fecha del viaje: ${Data.Fecha_Viaje}<br>
               Hora de salida: ${Data.Hora_Salida}<br>
               Origen: ${Data.Origen_Viaje}<br>
               Destino: ${Data.Destino_Viaje}</p>
          </div>
          <div class="download-link">
            <p>Por favor, haga clic en el siguiente enlace para descargar su boleto: <a href="${Data.Enlace_Boleto}">Enlace de descarga</a></p>
          </div>
          <div class="info">
            <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nosotros. ¡Estamos aquí para ayudarle!</p>
            <p>Flecha Amarilla</p>
          </div>
          <div class="image-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/Captura%20de%20pantalla%202024-03-26%20220537.png?alt=media&token=1b3504aa-9a28-402b-bbed-c8b68ce6c8ef" alt="Imagen 1">
          </div>
        </div>
      </body>
    </html>
`;

      const message = {
        from: process.env.EMAIL_USER,
        to: Destinatario,
        subject: 'YellowPass',
        html: htmlContent,
      };

      await transporter.sendMail(message);
      return 'Correo electrónico enviado correctamente';
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }
}
