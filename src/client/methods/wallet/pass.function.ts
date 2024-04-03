import * as jwt from 'jsonwebtoken';
import * as credencial from '../../../Archive/google-credentiales.json';
let credenciales = credencial;
export async function createWalletPass(credentials: any, eventDetails: any) {
  // Validar y sanitizar los detalles del evento (considerar usar una biblioteca de validación)

  const pass = {
    id: `110523168706375958753.EVENT_CLASS_ID`, // Reemplazar con ID de emisor real
    issuerName: '[TEST ONLY] Heraldic Event', // Reemplazar con nombre de emisor real
    localizedIssuerName: {
      defaultValue: {
        language: 'en-US',
        value: '[TEST ONLY] Heraldic Event',
      },
    },
    logo: {
      sourceUri: {
        uri: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&h=660',
      },
      contentDescription: {
        defaultValue: {
          language: 'en-US',
          value: 'LOGO_IMAGE_DESCRIPTION', // Reemplazar con descripción real
        },
      },
    },
    eventName: {
      defaultValue: {
        language: 'en-US',
        value: 'DAAWDDA', // Reemplazar con nombre de evento real
      },
    },
    venue: {
      name: {
        defaultValue: {
          language: 'en-US',
          value: 'ADWDAWD', // Reemplazar con nombre de lugar real
        },
      },
      address: {
        defaultValue: {
          language: 'en-US',
          value: "eventDetails.venueAddress", // Reemplazar con dirección real
        },
      },
    },
    dateTime: {
      start: "eventDetails.eventStartDateTime", // Reemplazar con fecha/hora de inicio real
    },
    reviewStatus: 'UNDER_REVIEW',
    hexBackgroundColor: '#264750',
    heroImage: {
      sourceUri: {
        uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&h=336',
      },
      contentDescription: {
        defaultValue: {
          language: 'en-US',
          value: 'HERO_IMAGE_DESCRIPTION', // Reemplazar con descripción real
        },
      },
    },
  };

  console.log('pass', pass);

  let email = 'Irving.CondeM@Gmail.com'
  const objectSuffix = `${email.replace(/[^\w.-]/g, '_')}`;

  const object = {
    id: `110523168706375958753.${objectSuffix}`, // Reemplazar con ID de objeto real
    classId: `110523168706375958753.codelab_class` , // Reemplazar con ID de clase de evento real
    state: 'ACTIVE',
    seatInfo: {
      seat: {
        defaultValue: {
          language: 'en-US',
          value: "eventDetails.seatNumber", // Reemplazar con número de asiento real
        },
      },
      row: {
        defaultValue: {
          language: 'en-US',
          value: "eventDetails.seatRow", // Reemplazar con fila de asiento real
        },
      },
      section: {
        defaultValue: {
          language: 'en-US',
          value: "eventDetails.seatSection", // Reemplazar con sección de asiento real
        },
      },
      gate: {
        defaultValue: {
          language: 'en-US',
          value: "eventDetails.gateNumber", // Reemplazar con número de puerta real
        },
      },
    },
    barcode: {
      type: 'QR_CODE',
      value: "eventDetails.barcodeValue", // Reemplazar con valor de código de barras real
      alternateText: '',
    },
  };

  console.log('object', object);

  const payload = {
    genericObjects: [object],
  };

  const claims = {
    iss: credenciales.client_email,
    aud: 'google',
    origins: ['www.example.com'],
    typ: 'savetowallet',
    payload: payload,
  };

  console.log('claims', claims);

  console.log('credenciales.private_key', credenciales.private_key);

  // La biblioteca `jsonwebtoken` se utiliza para firmar el JWT
  const jwtToken = await jwt.sign(claims, credenciales.private_key, {
    algorithm: 'RS256',
  });

  console.log('jwtToken', jwtToken);

  return jwtToken;
}
