interface Viaje {
    ID_Detalle_Viaje: number,
    ID_Conductor: number,
    ID_Detalle_Vehiculo: number,
    Status: string,
    Numero_Servicio: string,
    Asientos_Disponibles: number,
    Asientos_Ocupados: number,
}

export async function Crear_Viaje (
    datos: Viaje
) {
    const viaje = {
        ID_Detalle_Viaje: datos.ID_Detalle_Viaje,
        ID_Conductor: datos.ID_Conductor,
        ID_Detalle_Vehiculo: datos.ID_Detalle_Vehiculo,
        Status: datos.Status,
        Numero_Servicio: datos.Numero_Servicio,
        Asientos_Disponibles: datos.Asientos_Disponibles,
        Asientos_Ocupados: datos.Asientos_Ocupados,
    }

    await Campos_Vacios(viaje);

    return viaje;
}

function Campos_Vacios(viaje: any) {
    for (const campo in viaje) {
        if (viaje[campo] == null || viaje[campo] == undefined) {
            return new Error('Campo vacio');
        }
    }
    return false;
}

