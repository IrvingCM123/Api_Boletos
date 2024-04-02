import * as qr from 'qrcode';

export async function create_QR(Data: any) {
    try {
        // Convertir el objeto Data en una cadena JSON
        const jsonData = JSON.stringify(Data);

        // Crear el código QR a partir de la cadena JSON
        const qrDataURL = await qr.toDataURL(jsonData);

        return qrDataURL;
    } catch (error) {
        throw new Error('Error al crear el código QR');
    }
}
