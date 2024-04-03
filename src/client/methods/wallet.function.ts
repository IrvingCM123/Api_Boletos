import { create_QR } from './qr.function';
import { GoogleAuth } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import * as google_credencial from '../../Archive/google-credentiales.json';

export async function convertToWallet(Datos: any) {
    try {

        let credenciales_google = google_credencial
        console.log(credenciales_google);
        const issuerId = '3388000000022323741';
        const classId = `${issuerId}.flecha`;
        const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

        const httpClient = new GoogleAuth({
            credentials: credenciales_google,
            scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
        });

        let response;
        let genericClass = {
            'id': `${classId}`,
            'classTemplateInfo': {
              'cardTemplateOverride': {
                'cardRowTemplateInfos': [
                  {
                    'twoItems': {
                      'startItem': {
                        'firstValue': {
                          'fields': [
                            {
                              'fieldPath': 'object.textModulesData["points"]'
                            }
                          ]
                        }
                      },
                      'endItem': {
                        'firstValue': {
                          'fields': [
                            {
                              'fieldPath': 'object.textModulesData["contacts"]'
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              },
              'detailsTemplateOverride': {
                'detailsItemInfos': [
                  {
                    'item': {
                      'firstValue': {
                        'fields': [
                          {
                            'fieldPath': 'class.imageModulesData["event_banner"]'
                          }
                        ]
                      }
                    }
                  },
                  {
                    'item': {
                      'firstValue': {
                        'fields': [
                          {
                            'fieldPath': 'class.textModulesData["game_overview"]'
                          }
                        ]
                      }
                    }
                  },
                  {
                    'item': {
                      'firstValue': {
                        'fields': [
                          {
                            'fieldPath': 'class.linksModuleData.uris["official_site"]'
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            },
            'imageModulesData': [
              {
                'mainImage': {
                  'sourceUri': {
                    'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-2021-card.png'
                  },
                  'contentDescription': {
                    'defaultValue': {
                      'language': 'en-US',
                      'value': 'Google I/O 2022 Banner'
                    }
                  }
                },
                'id': 'event_banner'
              }
            ],
            'textModulesData': [
              {
                'header': 'Gather points meeting new people at Google I/O',
                'body': 'Join the game and accumulate points in this badge by meeting other attendees in the event.',
                'id': 'game_overview'
              }
            ],
            'linksModuleData': {
              'uris': [
                {
                  'uri': 'https://io.google/2022/',
                  'description': 'Official I/O \'22 Site',
                  'id': 'official_site'
                }
              ]
            }
          };
          try {
            response = await httpClient.request({
              url: `${baseUrl}/genericClass/${classId}`,
              method: 'GET'
            });
        
            console.log('Class already exists');
            console.log(response);
          } catch (err) {
            if (err.response && err.response.status === 404) {
              // Class does not exist
              // Create it now
              response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: 'POST',
                data: genericClass
              });
        
              console.log('Class insert response');
              console.log(response);
            } else {
              // Something else went wrong
              console.log(err);
              console.log('Something went wrong in class...check the console logs!');
            }
          }
          
          

          let objectSuffix = `${Datos.Email.replace(/[^\w.-]/g, '_')}`;
          let objectId = `${issuerId}.${objectSuffix}`;
        
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
        
          // TODO: Create the signed JWT and link
          const claims = {
            iss: credenciales_google.client_email,
            aud: 'google',
            origins: [],
            typ: 'savetowallet',
            payload: {
              genericObjects: [
                genericObject
              ]
            }
          };
        
          const token = jwt.sign(claims, credenciales_google.private_key, { algorithm: 'RS256' });
          const saveUrl = `https://pay.google.com/gp/v/save/${token}`;
        
        return saveUrl;
    } catch (error) {
        throw new Error('Error al convertir a Wallet');
    }
}
