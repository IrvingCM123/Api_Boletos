export function generate_Object(objectId: any, classId: any) {
    let genericObject = {
        'id': `${objectId}`,
        'classId': classId,
        'genericType': 'GENERIC_TYPE_UNSPECIFIED',
        'hexBackgroundColor': '#4285f4',
        'logo': {
            'sourceUri': {
                'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'
            }
        },
        'cardTitle': {
            'defaultValue': {
                'language': 'en',
                'value': 'Google I/O \'22'
            }
        },
        'subheader': {
            'defaultValue': {
                'language': 'en',
                'value': 'Attendee'
            }
        },
        'header': {
            'defaultValue': {
                'language': 'en',
                'value': 'Alex McJacobs'
            }
        },
        'barcode': {
            'type': 'QR_CODE',
            'value': `${objectId}`
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