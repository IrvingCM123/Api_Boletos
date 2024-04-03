import { create_QR } from "../qr.function";

export async function generate_Object(objectId: any, classId: any, Datos: any, tokenUser = null) {

    let qr_data =  JSON.stringify(Datos);
    console.log(qr_data);

    let genericObject = {
        'id': `${objectId}.${tokenUser}`,
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

    return genericObject;
}