import * as jwt from 'jsonwebtoken';

export async function createJwtNewObjects(issuerId, classSuffix, objectSuffix) {
    // See link below for more information on required properties
    // https://developers.google.com/wallet/tickets/events/rest/v1/eventticketclass
    let newClass = {
      'id': `${issuerId}.${classSuffix}`,
      'issuerName': 'Issuer name',
      'reviewStatus': 'UNDER_REVIEW',
      'eventName': {
        'defaultValue': {
          'language': 'en-US',
          'value': 'Event name'
        }
      }
    };

    // See link below for more information on required properties
    // https://developers.google.com/wallet/tickets/events/rest/v1/eventticketobject
    let newObject = {
      'id': `${issuerId}.${objectSuffix}`,
      'classId': `${issuerId}.${classSuffix}`,
      'state': 'ACTIVE',
      'heroImage': {
        'sourceUri': {
          'uri': 'https://farm4.staticflickr.com/3723/11177041115_6e6a3b6f49_o.jpg'
        },
        'contentDescription': {
          'defaultValue': {
            'language': 'en-US',
            'value': 'Hero image description'
          }
        }
      },
      'textModulesData': [
        {
          'header': 'Text module header',
          'body': 'Text module body',
          'id': 'TEXT_MODULE_ID'
        }
      ],
      'linksModuleData': {
        'uris': [
          {
            'uri': 'http://maps.google.com/',
            'description': 'Link module URI description',
            'id': 'LINK_MODULE_URI_ID'
          },
          {
            'uri': 'tel:6505555555',
            'description': 'Link module tel description',
            'id': 'LINK_MODULE_TEL_ID'
          }
        ]
      },
      'imageModulesData': [
        {
          'mainImage': {
            'sourceUri': {
              'uri': 'http://farm4.staticflickr.com/3738/12440799783_3dc3c20606_b.jpg'
            },
            'contentDescription': {
              'defaultValue': {
                'language': 'en-US',
                'value': 'Image module description'
              }
            }
          },
          'id': 'IMAGE_MODULE_ID'
        }
      ],
      'barcode': {
        'type': 'QR_CODE',
        'value': 'QR code'
      },
      'locations': [
        {
          'latitude': 37.424015499999996,
          'longitude': -122.09259560000001
        }
      ],
      'seatInfo': {
        'seat': {
          'defaultValue': {
            'language': 'en-US',
            'value': '42'
          }
        },
        'row': {
          'defaultValue': {
            'language': 'en-US',
            'value': 'G3'
          }
        },
        'section': {
          'defaultValue': {
            'language': 'en-US',
            'value': '5'
          }
        },
        'gate': {
          'defaultValue': {
            'language': 'en-US',
            'value': 'A'
          }
        }
      },
      'ticketHolderName': 'Ticket holder name',
      'ticketNumber': 'Ticket number'
    };

    // Create the JWT claims
    let claims = {
      iss: this.credentials.client_email,
      aud: 'google',
      origins: ['www.example.com'],
      typ: 'savetowallet',
      payload: {
        // The listed classes and objects will be created
        eventTicketClasses: [newClass],
        eventTicketObjects: [newObject]
      }
    };

    // The service account credentials are used to sign the JWT
    let token = jwt.sign(claims, this.credentials.private_key, { algorithm: 'RS256' });

    console.log('Add to Google Wallet link');
    console.log(`https://pay.google.com/gp/v/save/${token}`);

    return `https://pay.google.com/gp/v/save/${token}`;
  }