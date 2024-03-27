export enum Errores_TOKEN {

    // Errores de autenticación
    AUTH_TOKEN_NOT_FOUND = 'Token de autenticación no encontrado',
    AUTH_TOKEN_INVALID = 'Token de autenticación inválido',
    AUTH_TOKEN_EXPIRED = 'Token de autenticación expirado',
    AUTH_TOKEN_MALFORMED = 'Token de autenticación malformado',
}

export enum Errores_USUARIO {

    // Errores de usuario
    USUARIO_NOT_FOUND = 'Usuario no encontrado',
    USUARIO_INVALID = 'Usuario inválido',
    USUARIO_DUPLICATED = 'Usuario duplicado',
    USUARIO_NOT_CREATED = 'Usuario no creado',
    USUARIO_NOT_UPDATED = 'Usuario no actualizado',
    USUARIO_NOT_DELETED = 'Usuario no eliminado',
}

export enum Errores_Roles {

        // Errores de roles
        ROLE_NOT_FOUND = 'Rol no encontrado',
        ROLE_INVALID = 'Rol inválido',
        ROLE_DUPLICATED = 'Rol duplicado',
        ROLE_NOT_CREATED = 'Rol no creado',
        ROLE_NOT_UPDATED = 'Rol no actualizado',
        ROLE_NOT_DELETED = 'Rol no eliminado',
        ROLE_UNAUTHORIZED = 'Rol no autorizado',
}

export enum Errores_Cuentas {
    
        // Errores de cuentas
        CUENTA_NOT_FOUND = 'Cuenta no encontrada',
        CUENTA_INVALID = 'Cuenta inválida',
        CUENTA_NOT_CREATED = 'Cuenta no creada',
        CUENTA_NOT_UPDATED = 'Cuenta no actualizada',
        CUENTA_NOT_DELETED = 'Cuenta no eliminada',
        CUENTA_ALREADY_EXISTS = 'Cuenta ya existe',
}

export enum Errores_Messages {
    FIREBASE_CONFIG_LOAD = 'Error al cargar configuración de Firebase',
    GETTING_ACCESS_TOKEN = 'Error al obtener el token de acceso',
    MESSAGE_SEND_ERROR = 'Error al envíar el mensaje'
}

export enum Errores_Incidentes {
    EVENT_NOT_FOUND = 'Evento no encontrado',
    EVENT_INVALID = 'Evento inválido',
    EVENT_NOT_CREATED = 'Evento no creado',
    EVENT_NOT_UPDATED = 'Evento no actualizado',
    EVENT_NOT_DELETED = 'Evento no eliminado',
    EVENT_ALREADY_EXISTS = 'Evento ya existe'
}

export enum Errores_Eventos {
    INCIDENT_NOT_FOUND = 'Incidente no encontrado',
    INCIDENT_INVALID = 'Incidente inválido',
    INCIDENT_NOT_CREATED = 'Incidente no creado',
    INCIDENT_NOT_UPDATED = 'Incidente no actualizado',
    INCIDENT_NOT_DELETED = 'Incidente no eliminado',
    INCIDENT_ALREADY_EXISTS = 'Incidente ya existe'
}

export enum Errores_Catalogos {
    CATALOG_NOT_FOUND = 'Catálogo no encontrado',
    CATALOG_INVALID = 'Catálogo inválido',
    CATALOG_NOT_CREATED = 'Catálogo no creado',
    CATALOG_NOT_UPDATED = 'Catálogo no actualizado',
    CATALOG_NOT_DELETED = 'Catálogo no eliminado',
    CATALOG_ALREADY_EXISTS = 'Catálogo ya existe'
}

export enum Errores_Vehiculos {
    VEHICLE_NOT_FOUND = 'Vehículo no encontrado',
    VEHICLE_INVALID = 'Vehículo inválido',
    VEHICLE_NOT_CREATED = 'Vehículo no creado',
    VEHICLE_NOT_UPDATED = 'Vehículo no actualizado',
    VEHICLE_NOT_DELETED = 'Vehículo no eliminado',
    VEHICLE_ALREADY_EXISTS = 'Vehículo ya existe'
}

export enum Errores_Detalles_Viaje {
    DETAIL_NOT_FOUND = 'Detalle no encontrado',
    DETAIL_INVALID = 'Detalle inválido',
    DETAIL_NOT_CREATED = 'Detalle no creado',
    DETAIL_NOT_UPDATED = 'Detalle no actualizado',
    DETAIL_NOT_DELETED = 'Detalle no eliminado',
    DETAIL_ALREADY_EXISTS = 'Detalle ya existe'
}

export enum Errores_Conducores {
    DRIVER_NOT_FOUND = 'Conductor no encontrado',
    DRIVER_INVALID = 'Conductor inválido',
    DRIVER_NOT_CREATED = 'Conductor no creado',
    DRIVER_NOT_UPDATED = 'Conductor no actualizado',
    DRIVER_NOT_DELETED = 'Conductor no eliminado',
    DRIVER_ALREADY_EXISTS = 'Conductor ya existe'
}

export enum Errores_Viaje {
    TRAVEL_NOT_FOUND = 'Viaje no encontrado',
    TRAVEL_INVALID = 'Viaje inválido',
    TRAVEL_NOT_CREATED = 'Viaje no creado',
    TRAVEL_NOT_UPDATED = 'Viaje no actualizado',
    TRAVEL_NOT_DELETED = 'Viaje no eliminado',
    TRAVEL_ALREADY_EXISTS = 'Viaje ya existe'
}