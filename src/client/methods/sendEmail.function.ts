import sgMail from '@sendgrid/mail';
import { email_template } from '../template/email.template';
import { convert_Image } from './image.function';
import { boleto_template } from '../template/boleto.template';
import { create_QR } from './qr.function';

export async function enviarEmail(Data: any): Promise<string> {
    try {
      const Destinatario = Data.Destinatario;

      const Datos = Data.Data;

      let datos_qr: any = {};

      for (let key in Datos) {
        datos_qr[key] = Datos[key];
      }

      let url_wallet = await this.convertToWallet(datos_qr);
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      let url_QR_Image = await create_QR(datos_qr);

      let imagen_boleto_path = await convert_Image(Datos);

      let template_Boleto = boleto_template(Datos, url_QR_Image);

      const html_template = email_template(Datos, url_wallet);

      const msg = {
        to: Destinatario,
        from: 'emailYellowpass@gmail.com',
        subject: 'Ya tienes tu boleto!',
        html: html_template,
      };

      await sgMail.send(msg);
      return 'Correo electrónico enviado correctamente';
    } catch (error) {
      throw new Error('Error al enviar el correo electrónico');
    }
  }
