import { create_QR } from "../qr.function";

export async function generate_Object(objectId: any, classId: any, Data: any) {
    console.log(Data);
    let qr_data =  JSON.stringify(Data);
    console.log(qr_data);
    let genericObject = {
        'id': `${objectId}`,
        'classId': classId,
        'genericType': 'GENERIC_TYPE_UNSPECIFIED',
        'hexBackgroundColor': '#4285f4',
        'logo': {
            'sourceUri': {
                'uri': 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2FImagen%20de%20WhatsApp%202024-04-03%20a%20las%2000.36.26_1d0b86ee.jpg?alt=media&token=bd7a2608-71b7-4bf1-9dbd-b039f016d56b'
            }
        },
        'cardTitle': {
            'defaultValue': {
                'language': 'en',
                'value': 'Pase de abordaje'
            }
        },
        'subheader': {
            'defaultValue': {
                'language': 'en',
                'value': 'Pasajero'
            }
        },
        'header': {
            'defaultValue': {
                'language': 'en',
                'value': `${Data.Nombre_Usuario}`
            }
        },
        'barcode': {
            'type': 'QR_CODE',
            'value': `${qr_data}`
        },
        'heroImage': {
            'sourceUri': {
                'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg'
            }
        },
        'textModulesData': [
            {
                'header': 'POINTS',
                'body': '1234',
                'id': 'points'
            },
            {
                'header': 'CONTACTS',
                'body': '20',
                'id': 'contacts'
            }
        ]
    };

    return genericObject;
}