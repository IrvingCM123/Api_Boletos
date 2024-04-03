import { createWalletPass } from './pass.function';

export async function generateWalletUrl(credentials: any, eventDetails: any): Promise<string> {
  try {
    const jwtToken = await createWalletPass(credentials, eventDetails);

    // URL base de Google Wallet
    const walletUrl = 'https://pay.google.com/gp/v/save/';

    // Codificar el token JWT como URL segura
    const encodedToken = encodeURIComponent(jwtToken);

    // Construir la URL completa
    const completeUrl = `${walletUrl}${encodedToken}`;
    console.log(completeUrl);
    return completeUrl;
  } catch (error) {
    throw new Error(`Error al generar la URL de Google Wallet: ${error.message}`);
  }
}

// Ejemplo de uso
const credentials = {
  issuerId: 'YOUR_ISSUER_ID',
  privateKey: 'YOUR_PRIVATE_KEY',
};

const eventDetails = {
  eventName: 'Nombre del evento',
  venueName: 'Nombre del lugar',
  venueAddress: 'Dirección del lugar',
  eventStartDateTime: '2023-12-01T12:00:00',
  seatNumber: '10',
  seatRow: 'A',
  seatSection: '100',
  gateNumber: 'A1',
  barcodeValue: '1234567890',
};