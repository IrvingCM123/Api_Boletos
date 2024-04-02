export async function convertToWallet(Datos: any) {
    // Converto to google wallet pass
    const passData = {
      classId: Datos.nombre,
      object: {
        id: Datos.nombre, 
        classId: Datos.nombre,
        title: Datos.nombre,
        fields: [
          {
            key: 'No_Asiento',
            label: 'Número de asiento',
            value: Datos.noAsiento
          },
          {
            key: 'Origen_Viaje',
            label: 'Origen del viaje',
            value: Datos.origen
          },
          
        ]
      }
    };
     const passJson = JSON.stringify(passData);
     const passEncoded = Buffer.from(passJson).toString('base64');
     const passUrl = 'https://pay.google.com/gp/v/pubtrans/?p=${passEncoded}';
 
     return passUrl;
}