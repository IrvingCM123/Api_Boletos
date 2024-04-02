import { firebaseAdmin } from './../Firebase/firebase.config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as puppeteer from 'puppeteer';
import { boleto_template } from './template/boleto.template';
import * as request from 'request';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';

@Injectable()
export class ClientService {
  constructor() {
    dotenv.config();
  }

  async enviarEmail(Data: any,  user: User_Interface): Promise<string> {

    validateOwnershipAdmin(user);

    try {
      const datos_env: any = require('dotenv').config(process.env.EMAIL_USER);

      const Destinatario = Data.Destinatario;

      const Datos = Data.Data;

      let datos_imagen: any = {
        Nombre: Datos.Nombre_Usuario,
        Destino: Datos.Destino_Viaje,
      };

      let url_imagen = await this.convertToImage(datos_imagen);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: datos_env.parsed.EMAIL_USER,
          pass: datos_env.parsed.EMAIL_PASS,
        },
      });

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
            padding: -20px;
          }
        </style>
      </head>
      <body>
        <div class="container">

        <div class="image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/Captura%20de%20pantalla%202024-03-26%20220537.png?alt=media&token=1b3504aa-9a28-402b-bbed-c8b68ce6c8ef" alt="Imagen 1">
        </div>

          <div class="header">
            <h2>¡Ya tienes tu boleto de autobús!</h2>
          </div>
          <div class="info">
            <p>Hola ${Datos.Nombre_Usuario}!</p>
            <p>Fecha del viaje: ${Datos.Fecha_Viaje}<br>
              Viaje: ${Datos.Origen_Viaje} -  ${Datos.Destino_Viaje}<br>
              Hora de salida: ${Datos.Hora_Salida}<br>
          </div>
          <div class="download-link">
            <p>Por favor, haga clic en el siguiente enlace para descargar su boleto:  <a href="${url_imagen}" download="Boleto.jpg">Enlace de descarga</a></a></p>
          </div>
          <div class="info">
            <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nosotros. ¡Estamos aquí para ayudarle!</p>
            <p>Flecha Amarilla</p>
          </div>
          <div class="info">
            <h4>Agregar boleto a la wallet</h4>
            <p>Si no tiene la aplicación Wallet instalada, puede descargarla desde la Play Store (Android) o la App Store (iOS).</p>
            <p>Una vez que haya descargado e instalado la aplicación Wallet, siga estos pasos para agregar su boleto:</p>
              <ol>
                <li>Inicie sesión en la aplicación Wallet.</li>
                <li>Seleccione la opción "Agregar a billetera".</li>
                <li>Seleccione la imagen del boleto descargada en su dispositivo.</li>
                <li>Haga clic en "Guardar".</li>
              </ol>
            <p>Descargar la aplicación:</p>
              <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel&pli=1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Google_Play_2022_logo.svg/512px-Google_Play_2022_logo.svg.png" alt="Play Store" width="150px">
              </a>
              <a href="https://apps.apple.com/mx/app/apple-wallet/id1160481993">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png" alt="App Store" width="150px">
              </a>
          </div>
        </div>
      </body>
    </html>
`;

      const message = {
        from: datos_env.EMAIL_USER,
        to: Destinatario,
        subject: '¡Aquí está tu boleto de autobús!',
        html: htmlContent,
      };

      await transporter.sendMail(message);
      return 'Correo electrónico enviado correctamente';
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }

  async convertToImage(Datos: string) {
    let launchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    const htmlContent = boleto_template(Datos);

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 90,
    });

    const screenshotBase64 = screenshotBuffer.toString('base64');

    await browser.close();

    let file_name = 'boleto.jpg';
    let image_path = await this.uploadImage(screenshotBase64, file_name);

    return image_path;
  }

  async uploadImage(imagenBase64, filename: string) {
    let db = firebaseAdmin.storage();
    let bucket = db.bucket();
    const filePath = `Multimedia//${filename}`;

    const imageBuffer = Buffer.from(imagenBase64, 'base64');

    await bucket.file(filePath).save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const expiresInSeconds = 30 * 24 * 60 * 60;

    const downloadUrl = await bucket.file(filePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresInSeconds * 1000,
    });

    return downloadUrl[0];
  }
  catch(error) {
    console.error('Error al subir la imagen a Firebase Storage:', error);
    throw error;
  }

  async Descargar_Boletos(urlImagen: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      request.get(urlImagen, { encoding: null }, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (response.statusCode !== 200) {
          return reject(
            new Error(
              `Failed to fetch image. Status code: ${response.statusCode}`,
            ),
          );
        }
        resolve(body);
      });
    });
  }
}
