import { create_QR } from './qr.function';
import { GoogleAuth } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import * as google_credenciales from '../../Archive/google-credentiales.json';

export async function convertToWallet(Datos: any) {
    try {

        let credenciales_google = google_credenciales
        const issuerId = '110523168706375958753';
        const classId = `${issuerId}.codelab_class`;
        const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';
        const httpClient = new GoogleAuth({
            credentials: credenciales_google,
            scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
        });
        const objectSuffix = `${Datos.Email.replace(/[^\w.-]/g, '_')}`;
        const objectId = `${issuerId}.${objectSuffix}` ;
        const genericObject = {
            id: objectId,
            classId: classId,
            genericType: 'GENERIC_TYPE_UNSPECIFIED',
            hexBackgroundColor: '#4285f4',
            logo: {
                sourceUri: {
                    uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'
                }
            },
            cardTitle: {
                defaultValue: {
                    language: 'es-MX',
                    value: 'Flecha Amarilla'
                }
            },
            subheader: {
                defaultValue: {
                    language: 'es-MX',
                    value: 'Nombre de pasajero'
                }
            },
            header: {
                defaultValue: {
                    language: 'en',
                    value: Datos.Nombre_Usuario
                }
            },
            barcode: {
                type: 'QR_CODE',
                value: await create_QR(Datos)
            },
            heroImage: {
                sourceUri: {
                    uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg'
                }
            },
            textModulesData: [
                {
                    header: 'POINTS',
                    body: '1234',
                    id: 'points'
                },
                {
                    header: 'CONTACTS',
                    body: '20',
                    id: 'contacts'
                }
            ]
        };
        const claims = {
            iss: credenciales_google.client_email,
            aud: 'google',
            origins: [],
            typ: 'savetowallet',
            payload: {
                genericObjects: [
                    genericObject
                ]
            }
        };

        const token = jwt.sign(claims, credenciales_google.private_key, { algorithm:'RS256'});
        const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

        console.log('Save URL: ', saveUrl);

        return saveUrl;
    } catch (error) {
        throw new Error('Error al convertir a Wallet');
    }
}
