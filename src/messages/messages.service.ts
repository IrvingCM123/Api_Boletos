import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { UnauthorizedException } from '@nestjs/common';
import * as firebaseAdminConfig from '../Archive/firebase-admin.json';

import axios from 'axios';

import { User_Interface } from 'src/common/interfaces/user.interface';
import { Message_Interface } from 'src/common/interfaces/message.interface';

import { Rol } from 'src/common/enums/rol.enum';
import { Errores_Roles } from 'src/common/helpers/Errores.service';
import { Errores_Messages } from 'src/common/helpers/Errores.service';

@Injectable()
export class MessagesService {
  private readonly MESSAGING_SCOPE =
    'https://www.googleapis.com/auth/firebase.messaging';

  private readonly SCOPES = [this.MESSAGING_SCOPE];

  async getAccessToken(user: User_Interface): Promise<string> {
    this.validateOwnership(user);

    const firebase_config = firebaseAdminConfig;

    if (!firebaseAdminConfig) {
      throw new Error(Errores_Messages.FIREBASE_CONFIG_LOAD);
    }

    const jwtClient = new google.auth.JWT(
      firebase_config.client_email,
      null,
      firebase_config.private_key,
      this.SCOPES,
      null,
    );

    try {
      const tokens = await jwtClient.authorize();
      return tokens.access_token;
    } catch (error) {
      throw new Error(Errores_Messages.GETTING_ACCESS_TOKEN);
    }
  }

  async sendNotification(datos: any, tokens: any, user: User_Interface) {
    this.validateOwnership(user);

    let informacion_mensaje = datos.datos;

    const accessToken = await this.getAccessToken(user);

    for (const token of datos.tokens) {
      try {
        await axios.post(
          'https://fcm.googleapis.com/v1/projects/guadalajara-17336/messages:send',
          {
            message: {
              token: token,
              data: {
                Evento: informacion_mensaje.Evento,
                Lugar: informacion_mensaje.Lugar,
                Viaje: informacion_mensaje.Viaje,
                Hora_Reprogramada: informacion_mensaje.Hora_Reprogramada,
              },
              notification: {
                title: informacion_mensaje.Titulo,
                body: informacion_mensaje.Descripcion,
              },
              android: {
                notification: {
                  image:
                    (datos.Imagen ) ??
                    'https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png',
                },
              },
              apns: {
                payload: {
                  aps: {
                    'mutable-content': 1,
                  },
                },
                fcm_options: {
                  image:
                    (datos.Imagen) ??
                    'https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png',
                },
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        return 'Mensaje enviado correctamente';
      } catch (error) {
        throw new Error(Errores_Messages.MESSAGE_SEND_ERROR);
      }
    }
  }
  private validateOwnership(user: User_Interface) {
    if (user.role !== Rol.ADMIN) {
      throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
    } else {
      return true;
    }
  }
}
