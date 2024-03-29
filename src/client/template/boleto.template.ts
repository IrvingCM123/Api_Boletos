export function boleto_template(Datos: any) {
  const html_boleto = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boleto de Pasaje</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
    }
    
    .ticket {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
    }
    
    .ticket-header {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .ticket-header h1 {
        margin: 0;
        color: #333;
    }
    
    .ticket-info {
        color: #333;
    }
    
    .ticket-info p {
        margin: 5px 0;
    }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="ticket-header">
            <h1>Boleto de Pasaje</h1>
        </div>
        <div class="ticket-info">
            <p><strong>Nombre:</strong> ${Datos.Nombre} </p>
            <p><strong>Destino:</strong> ${Datos.Destino} </p>
            <p><strong>Fecha:</strong> 29 de marzo de 2024</p>
            <p><strong>Hora:</strong> 10:00 AM</p>
            <p><strong>Asiento:</strong> A12</p>
        </div>
    </div>
</body>
</html>
`;

  return html_boleto;
}
