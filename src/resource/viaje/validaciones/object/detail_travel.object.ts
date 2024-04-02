interface Detalle_Viaje {
    ID_Conductor: any;
    ID_Detalle_Vehiculo: any;
    Status: string;
    Numero_Servicio: string;
    Asientos_Disponibles: number;
    Asientos_Ocupados: number;
    ID_Origen: number;
    ID_Destino: number;
    fecha_salida: string;
    fecha_llegada: string;
    precio: number;
    hora_salida: string;
    hora_llegada: string;
}

export async function Crear_Detalle_Viaje(
    datos: Detalle_Viaje,
) {
    const detalle_viaje = {
        origen: datos.ID_Origen,
        destino: datos.ID_Destino,
        fecha_salida: datos.fecha_salida,
        fecha_llegada: datos.fecha_llegada,
        precio: datos.precio,
        hora_salida: datos.hora_salida,
        hora_llegada: datos.hora_llegada,
    };

    await Campos_Vacios(detalle_viaje);

    return detalle_viaje;
}

function Campos_Vacios(detalle_viaje: any) {
    for (const campo in detalle_viaje) {
        if (detalle_viaje[campo] == null || detalle_viaje[campo] == undefined) {
            return new Error('Campo vacio');
        }
    }
    return false;
}
