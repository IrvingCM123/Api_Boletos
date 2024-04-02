import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as puppeteer from 'puppeteer';
import { boleto_template } from './template/boleto.template';
import * as request from 'request';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateOwnershipAdmin } from 'src/Guard/validateOwnerShip.guard';
import { enviarEmail } from './methods/sendEmail.function';
@Injectable()
export class ClientService {
  constructor() {
    dotenv.config();
  }

  async send_Email(Data: any, user:User_Interface) {
    validateOwnershipAdmin(user);

    await enviarEmail(Data);
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
