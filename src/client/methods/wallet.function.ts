import { create_QR } from './qr.function';
import { GoogleAuth } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import * as google_credenciales from '../../Archive/google-credentiales.json';
import * as fs from 'fs';
import { google } from 'googleapis';

let credenciales_google = google_credenciales;
const issuerId = '110523168706375958753';
const classId = `${issuerId}.codelab_class`;
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const auth = new google.auth.JWT(
    credenciales_google.client_email,
    null,
    credenciales_google.private_key,
    ['https://www.googleapis.com/auth/wallet_object.issuer']
  );
  
  const wallet = google.walletobjects({
    version: 'v1',
    auth: auth
  });

export async function convertToWallet(Datos: any) {

  // Área local del archivo de imagen que deseas subir
  const imagePath = 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2Fboleto.jpg?alt=media&token=c3588dae-a930-47b8-ac78-11f65ffddb44';

  // Autenticación con las credenciales
  const auth = new google.auth.JWT(
    credenciales_google.client_email,
    null,
    credenciales_google.private_key,
    ['https://www.googleapis.com/auth/wallet_object.issuer'],
  );

  // Inicializar cliente de Google Wallet
  const wallet = google.wallet_v1;

    try {

      // Leer la imagen del disco
      const image = fs.readFileSync(imagePath);
      const classId = `${issuerId}.codelab_class`;

      // Subir la imagen
      const result = await wallet.offerclass.insert({
        issuerId: issuerId,
        resource: {
          classId: classId,
          heroImage: {
            kind: 'walletobjects#image',
            sourceUri: {
              uri: 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2Fboleto.jpg?alt=media&token=c3588dae-a930-47b8-ac78-11f65ffddb44', // URL de la imagen
              description: 'Description of image',
            },
          },
        },
      });

      console.log('Image uploaded successfully:', result.data);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  

}
