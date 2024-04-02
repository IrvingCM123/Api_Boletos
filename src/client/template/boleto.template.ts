export function boleto_template(Datos: any, qrData) {
    const html_boleto = `
    <TYPE html>
    <html lang="en">
    <head>
        <title>Yellow Pass</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 25px;
                padding: 20px;
                margin-top: 0;
            }
            .container {
                width: 200px;
                height: 500px;     
                max-width: 300px;    

            }
            .header {
                text-align: center;
                color: #f1c40f;
                font-size: 12px;
                margin:0;
            }
            .content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .left, .right{
                padding: 10px;
                box-sizing: border-box;
                border-radius: 10px;
                height: 250px;
                width: 260px;
                box-shadow: 10px 0px 15px -5px rgba(0, 0, 0, 0.1), -10px 0px 15px -5px rgba(0, 0, 0, 0.1);
            }
            .rigth{
                background: linear-gradient(to bottom right, #FFD700, #FFA500);
            }
            .left {
                background-color: #E9E9E9;
                padding: 30px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap:10px; 
                background: linear-gradient(to bottom left, #EBEBEB, #fff);
            }

            .right {
                background-color: #FFCC00;
            }
            p {
                font-weight: 600;
                font-size: 10px;
                color: #979797;
            }
            h3 {
                color: #ADADAD;
                font-size: 10px;
            }
            .qr-code img{
                width: 130px;
                border-radius: 15px;
                margin: 0 55px;
            }
            .qr-code p{
                font-size: 9px;
                color: #ffff;
                margin: 15px 35px;
            }
            .asiento{
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">

            <div class="content">
             <div class="right">
                         <div class="header">
                <h2 style="background-color: transparent; color: #Ffff; font-weight: 800; ">Yellow Pass</h1>
            </div>
                    <div class="qr-code">
                           <img src="${qrData}" alt="QR Code">
                        <p>Presente este QR al abordar el autobús</p>
                    </div>
                </div>
                <div class="left">
                    <div style="position: absolute; top: 280px;">
                        <h3 >Nombre: </h3>
                        <p >${Datos.nombre}</p>
                        <hr style="width: 200px; position: absolute; top: 40px;"> 
                        <hr style="width: 200px; position: absolute; top: 170px;"> 
                    </div>
                    <div class="info" style="padding-top: 25px;" >
                        <h3>Hora:</h3>
                        <p>${Datos.hora}</p>
                        <h3>Origen: </h3>
                        <p>${Datos.origen}</p>
                        <h3>Precio:</h3>
                        <p>${Datos.totalPago}</p>
                        <h3 class="asiento">Número de Asiento: </h3>
                        <p>${Datos.noAsiento}</p>
                    </div>
                    <div class="info" style="padding-top: 25px;" >
                        <h3>Fecha: </h3>
                        <p>${Datos.fechaSalida}</p>
                        <h3>Destino:</h3>
                        <p>${Datos.destino}</p>
                        <h3>Puerta:</h3>
                        <p>${Datos.puertaEnbarque}</p>
                        <h3 class="asiento">Tipo de Asiento:</h3>
                        <p>${Datos.categoria}</p>
                    </div>
                </div>  
            </div>
            </div>
        </div>
    </body>
    </html>
       `;

    return html_boleto;
}