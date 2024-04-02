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

  async send_Email(user:User_Interface) {
    validateOwnershipAdmin(user);


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
