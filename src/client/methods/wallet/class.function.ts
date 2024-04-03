export function generete_Class(classId: any) {
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

  return genericClass;
};