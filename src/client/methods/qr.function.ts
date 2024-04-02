import * as qr from 'qrcode';

export async function create_QR(Data: any) {
    try {
        const qrDataURL = await qr.toDataURL(Data);
        return qrDataURL;
    } catch (error) {
        throw new Error('Error al crear el código QR');
    }

}