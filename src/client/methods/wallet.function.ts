import { generete_Class } from './wallet/class.function';
import { generate_Object } from './wallet/object.function';
import { generate_Token } from './wallet/token.function';
import { generate_response } from './wallet/response.function';

export async function convertToWallet(Datos: any) {

  try {

    const issuerId = '3388000000022323741';
    const classId = `${issuerId}.flecha`;

    let genericClass = generete_Class(classId);

    await generate_response(issuerId);

    let objectSuffix = `${Datos.Email.replace(/[^\w.-]/g, '_')}`;
    let objectId = `${issuerId}.${objectSuffix}`;

    const genericObject = generate_Object(objectId, classId);

    let token = await generate_Token(genericObject);

    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    return saveUrl;
  } catch (error) {
    throw new Error('Error al convertir a Wallet');
  }
}
