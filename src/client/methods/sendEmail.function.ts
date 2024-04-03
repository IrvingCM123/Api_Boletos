import * as SendGrid from '@sendgrid/mail';
import { email_template } from '../template/email.template';
import { convert_Image } from './image.function';
import { boleto_template } from '../template/boleto.template';
import { create_QR } from './qr.function';
import * as dotenv from 'dotenv';
import { convertToWallet} from './wallet.function';
import { generateWalletUrl } from './wallet/wallet_Android.function';
dotenv.config();

export async function enviarEmail(Data: any): Promise<string> {
    try {
      const Destinatario = Data.Destinatario;

      const Datos = Data.Data;

      let datos_qr: any = {};

      for (let key in Datos) {
        datos_qr[key] = Datos[key];
      }

      const dotenvConfig = require('dotenv').config();
      const sendgridApiKey = dotenvConfig.parsed.SENDGRID_API_KEY;

      SendGrid.setApiKey('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');

      let imagen_boleto_path = await convert_Image(Datos);

      //let url_wallet = await convertToWallet(Datos);

      let url_wallet = await generateWalletUrl(Datos, "2");

      console.log('url_wallet', url_wallet);

      const html_template = email_template(Datos, imagen_boleto_path, '2');

      const msg = {
        to: Destinatario,
        from: 'emailYellowpass@gmail.com',
        subject: 'Ya tienes tu boleto!',
        html: html_template,
      };

      await SendGrid.send(msg);
      return 'Correo electrónico enviado correctamente';
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }
function generateWallet(Datos: any) {
  throw new Error('Function not implemented.');
}

