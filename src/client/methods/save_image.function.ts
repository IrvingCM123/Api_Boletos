import { firebaseAdmin } from 'src/Firebase/firebase.config';

export async function uploadImage_Firebase(imagenBase64, filename: string) {
    try {
        let db = firebaseAdmin.storage();
        let bucket = db.bucket();
        const filePath = `Multimedia//${filename}`;

        const imageBuffer = Buffer.from(imagenBase64, 'base64');

        await bucket.file(filePath).save(imageBuffer, {
            metadata: {
                contentType: 'image/jpeg',
            },
        });

        const expiresInSeconds = 30 * 24 * 60 * 60;

        const downloadUrl = await bucket.file(filePath).getSignedUrl({
            action: 'read',
            expires: Date.now() + expiresInSeconds * 1000,
        });

        return downloadUrl[0];
    } catch (error) {
        console.error('Error al subir la imagen a Firebase Storage:', error);
        throw error;
    }
}
