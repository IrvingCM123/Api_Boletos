import * as jwt from 'jsonwebtoken';
import * as google_credencial from '../../../Archive/google-credentiales.json';

export async function generate_Token(genericObject: any) {
  let credenciales_google = google_credencial;

  const claims = {
    iss: credenciales_google.client_email,
    aud: 'google',
    origins: [],
    typ: 'savetowallet',
    payload: {
      genericObjects: [genericObject],
    },
  };

  const token = jwt.sign(claims, credenciales_google.private_key, {
    algorithm: 'RS256',
  });

  return token;
}
