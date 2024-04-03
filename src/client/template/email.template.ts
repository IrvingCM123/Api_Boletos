export function email_template(Datos: any, url_imagen: string, url_wallet: string) {
    const html_boletos = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2; /* Color de fondo */
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px; /* Bordes redondeados */
            background-color: #fff; /* Color de fondo del contenedor */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Sombra */
          }
          .header {
            text-align: center;
            color: #333; /* Color del encabezado */
            font-size: 24px; /* Tamaño del texto del encabezado */
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 20px;
            color: #666; /* Color del texto de información */
          }
          .info p {
            margin: 5px 0;
          }
          .download-link {
            text-align: center;
          }
          .image-container {
            text-align: center;
            margin-top: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
            padding: -20px;
            margin-right: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">

        <div class="image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/heartmodel-caedd.appspot.com/o/Captura%20de%20pantalla%202024-03-26%20220537.png?alt=media&token=1b3504aa-9a28-402b-bbed-c8b68ce6c8ef" alt="Imagen 1">
        </div>

          <div class="header">
            <h2>¡Ya tienes tu boleto de autobús!</h2>
          </div>
          <div class="info">
            <p>Hola ${Datos.Nombre_Usuario}!</p>
            <p>Fecha del viaje: ${Datos.Fecha_Viaje}<br>
              Viaje: ${Datos.Origen_Viaje} -  ${Datos.Destino_Viaje}<br>
              Hora de salida: ${Datos.Hora_Salida}<br>
          </div>
          <div class="download-link">
            <p>Por favor, haga clic en el siguiente enlace para descargar su boleto:  <a href="${url_imagen}" download="Boleto.jpg">Enlace de descarga</a></a></p>
          </div>
          <div class="download-link">
            <p>Wallet  <a href="${ulr_wallet}" download="Boleto.jpg">Enlace de descarga</a></a></p>
          </div>
          <div class="info">
            <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nosotros. ¡Estamos aquí para ayudarle!</p>
            <p>Flecha Amarilla</p>
          </div>
          <div class="info">
            <h4>Agregar boleto a la wallet</h4>
            <p>Si no tiene la aplicación Wallet instalada, puede descargarla desde la Play Store (Android) o la App Store (iOS).</p>
            <p>Una vez que haya descargado e instalado la aplicación Wallet, siga estos pasos para agregar su boleto:</p>
              <ol>
                <li>Inicie sesión en la aplicación Wallet.</li>
                <li>Seleccione la opción "Agregar a billetera".</li>
                <li>Seleccione la imagen del boleto descargada en su dispositivo.</li>
                <li>Haga clic en "Guardar".</li>
              </ol>
            <p>Descargar la aplicación:</p>
              <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel&pli=1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Google_Play_2022_logo.svg/512px-Google_Play_2022_logo.svg.png" alt="Play Store" width="130px">
              </a>
              <a href="https://apps.apple.com/mx/app/apple-wallet/id1160481993">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png" alt="App Store" width="130px">
              </a>
          </div>
        </div>
      </body>
    </html>
`;
    return html_boletos;
}