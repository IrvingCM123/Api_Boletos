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

  private readonly MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';

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
      null
    );

    try {
      const tokens = await jwtClient.authorize();
      return tokens.access_token;
    } catch (error) {
      throw new Error(Errores_Messages.GETTING_ACCESS_TOKEN);
    }
  }

  async sendNotification(
    user: User_Interface,
    tokens: string[],
    data: Message_Interface
    ): Promise<void> {
      
    this.validateOwnership(user);

    const accessToken = await this.getAccessToken(user);

    for (const token of tokens) {
      const message = {
        token: token,
        data: data,
        notification: {
          Titulo: data.Titulo,
          Descripcion: data.Descripcion,
          Evento: data.Evento,
          Lugar: data.Lugar,
          Viaje: data.Viaje,
        },
        android: {
          notification: {
            image: (data && data.Imagen) ?? 'https://foo.bar/default-image.png'
          }
        },
        apns: {
          payload: {
            aps: {
              'mutable-content': 1
            }
          },
          fcm_options: {
            image: (data && data.Imagen) ?? 'https://foo.bar/default-image.png'
          }
        }
      };

      try {
        await axios.post('https://fcm.googleapis.com/v1/projects/guadalajara-17336/messages:send', {
          message
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        throw new Error(Errores_Messages.MESSAGE_SEND_ERROR);
      }
    }
  }

  private validateOwnership(user: User_Interface) {
    if (user.role !== Rol.USER) {
      throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
    } else {
      return true;
    }
  }
}
