import { create_QR } from './qr.function';
import { GoogleAuth } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import * as google_credencial from '../../Archive/google-credentiales.json';

export async function convertToWallet(Datos: any) {
    try {
        let adk = "flecha_1245";
        let tokenUser = `${Datos.Nombre_Usuario}+${Datos.Apellidos}+${Datos.Numero_Boleto}`;
        let credenciales_google = google_credencial;
        const issuerId = '3388000000022323741';
        const classId = `${issuerId}.${adk}`;
        const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

        const httpClient = new GoogleAuth({
            credentials: credenciales_google,
            scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
        });
        console.log('Datos', Datos);
        let Data = JSON.stringify(Datos);
        let response;
        let genericClass = {
            'id': `${classId}`,
            'classTemplateInfo': {
              'cardTemplateOverride': {
                'cardRowTemplateInfos': [
                  {
                    "oneItem": {
                    'item': {
                      'firstValue': {
                        'fields': [
                          {
                            'fieldPath': 'class.imageModulesData["event_banner"]'
                          }
                        ]
                      }
                    }
                    }
                  },
                  {
                    "threeItems": {
                      "startItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['origen_viaje']",
                            },
                          ],
                        },
                      },
                      "middleItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['fecha_salida']",
                            },
                          ],
                        },
                      },
                      "endItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['hora_salida']",
                            },
                          ],
                        },
                      },
                    },
                  },
                  
                  {
                    "threeItems": {
                      "startItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['destino_viaje']",
                            },
                          ],
                        },
                      },
                      "middleItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['fecha_llegada']",
                            },
                          ],
                        },
                      },
                      "endItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['hora_llegada']",
                            },
                          ],
                        },
                      },
                    },
                  },
                  
                  {
                    "threeItems": {
                      "startItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['categoria']",
                            },
                          ],
                        },
                      },
                      "middleItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['asiento']",
                            },
                          ],
                        },
                      },
                      "endItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['puerta_embarque']",
                            },
                          ],
                        },
                      },
                    },
                  },
                   
                  {
                    "threeItems": {
                      "startItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['estado']",
                            },
                          ],
                        },
                      },
                      "middleItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['total_pagado']",
                            },
                          ],
                        },
                      },
                      "endItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['metodo_pago']",
                            },
                          ],
                        },
                      },
                    },
                  },
                  
                  {
                    "threeItems": {
                      "startItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['operacion']",
                            },
                          ],
                        },
                      },
                      "middleItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['servicio']",
                            },
                          ],
                        },
                      },
                      "endItem": {
                        "firstValue": {
                          "fields": [
                            {
                              "fieldPath": "object.textModulesData['facturacion']",
                            },
                          ],
                        },
                      },
                    },
                  },
                  
                  {
                    "oneItem": {

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
                  },
                  
                {
                  "oneItem": 
                  
                  {
                    'item': {
                      'firstValue': {
                        'fields': [
                          {
                            'fieldPath': 'class.textModulesData["eslogan"]'
                          }
                        ]
                      }
                    }
                  }
                  
                  },
                ]
              },
            },
            'imageModulesData': [
              {
                'mainImage': {
                  'sourceUri': {
                    'uri': 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2FImagen%20de%20WhatsApp%202024-04-03%20a%20las%2000.35.07_4cbb8f92.jpg?alt=media&token=3e5fc324-6287-48d0-8c8f-72fc95d758bc'
                  },
                  'contentDescription': {
                    'defaultValue': {
                      'language': 'es-MX',
                      'value': 'Flecha Amarilla Logo'
                    }
                  }
                },
                'id': 'event_banner'
              }
            ],
            'textModulesData': [
              {
                'header': 'Tu viaje con Flecha Amarilla',
                'body': 'Viaja con Flecha Amarilla y disfruta de la experiencia de viajar con nosotros.',
                'id': 'eslogan'
              }
            ],
            'linksModuleData': {
              'uris': [
                {
                  'uri': 'https://www.facebook.com/AutobusesFlechaAmarilla/?locale=es_LA',
                  'description': 'Sitio Oficial Flecha Amarilla',
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
            'classId': `${classId}`,
            'issuerName': 'Grupo Flecha Amarilla',
            'localizedIssuerName': {
                'defaultValue': {
                'language': 'es-MX',
                'value': 'Grupo Flecha Amarilla',
                },
            },
            'hexBackgroundColor': '#f9e93e',
            'heroImage': {
                'sourceUri': {
                'uri': 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2FImagen%20de%20WhatsApp%202024-04-03%20a%20las%2000.35.58_b107830b.jpg?alt=media&token=7796ae4c-c4fb-4187-8ac2-3db74cc86c95'
                },
                
                'contentDescription': {
                  'defaultValue': {
                    'language': 'es-MX',
                    'value': 'Flecha Amarilla Logo'
                  }
                }
                
            },

            'logo': {
                'sourceUri': {
                'uri': 'https://firebasestorage.googleapis.com/v0/b/guadalajara-17336.appspot.com/o/Multimedia%2F%2FImagen%20de%20WhatsApp%202024-04-03%20a%20las%2000.35.07_4cbb8f92.jpg?alt=media&token=3e5fc324-6287-48d0-8c8f-72fc95d758bc'
              },
              
              'contentDescription': {
                'defaultValue': {
                  'language': 'es-MX',
                  'value': 'Flecha Amarilla Logo'
                }
              }
            },
            'cardTitle': {
              'defaultValue': {
                'language': 'es-MX',
                'value': 'Grupo Flecha Amarilla'
              }
            },
            'subheader': {
              'defaultValue': {
                'language': 'es-MX',
                'value': 'PASAJERO'
              },
              'otroCampo': {
                  'language': 'es-MX',
                  'value': 'numero_boleto'
              }
            },
            'header': {
              'defaultValue': {
                'language': 'es-MX',
                'value': `${Datos.Nombre} ${Datos.Apellidos}`
              }
            },
            'barcode': {
              'type': 'QR_CODE',
              'value': `${Datos}`
            
            },
            'textModulesData': [
              {
                'header': 'NOMBRE',
                'body': `${Datos.Nombre} ${Datos.Apellidos}`,
                'id': 'nombre'
              },
              {
                'header': 'EMAIL',
                'body': `${Datos.Email}`,
                'id': 'email'
              },
              {
                'header': 'ORIGEN',
                'body': `${Datos.Origen_Viaje}`,
                'id': 'origen_viaje'
              },
              {
                'header': 'DESTINO',
                'body': `${Datos.Destino_Viaje}`,
                'id': 'destino_viaje'
              },
              {
                'header': 'FECHA SALIDA',
                'body': `${Datos.Fecha_Salida}`,
                'id': 'fecha_salida'
              },
              {
                'header': 'HORA SALIDA',
                'body': `${Datos.Hora_Salida}`,
                'id': 'hora_salida'
              },
              {
                'header': 'FECHA LLEGADA',
                'body': `${Datos.Fecha_Llegada}`,
                'id': 'fecha_llegada'
              },
              {
                'header': 'HORA LLEGADA',
                'body': `${Datos.Hora_Llegada}`,
                'id': 'hora_llegada'
              },
              {
                'header': 'ASIENTO',
                'body': `${Datos.Asiento}`,
                'id': 'asiento'
              },
              {
                'header': 'CATEGORIA',
                'body': `${Datos.Categoria}`,
                'id': 'categoria'
              },
              {
                'header': 'PUERTA EMBARQUE',
                'body': `${Datos.Puerta}`,
                'id': 'puerta_embarque'
              },
              {
                'header': 'NUMERO BOLETO',
                'body': `${Datos.Numero_Boleto}`,
                'id': 'boleto_numero'
              },
              {
                'header': 'TOTAL PAGADO',
                'body': `${Datos.Precio}`,
                'id': 'total_pagado'
              },
              {
                'header': 'METODO PAGO',
                'body': `${Datos.Metodo_Pago}`,
                'id': 'metodo_pago'

              },
              {
                'header': 'ESTADO',
                'body': `${Datos.Estado}`,
                'id': 'estado'
              },
              {
                'header': 'NUMERO SERVICIO',
                'body': `${Datos.Servicio}`,
                'id': 'servicio'
              },
              {
                'header': 'NUMERO OPERACION',
                'body': `${Datos.Operacion}`,
                'id': 'operacion'
              },
              {
                'header': 'TOKEN FACTURACION',
                'body': `${Datos.Facturacion}`,
                'id': 'facturacion'
              },
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
        console.log('saveUrl', saveUrl);
        return saveUrl;
    } catch (error) {
        throw new Error('Error al convertir a Wallet');
    }
}
