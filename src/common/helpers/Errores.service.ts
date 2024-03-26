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
        CUENTA_DUPLICATED = 'Cuenta duplicada',
        CUENTA_NOT_CREATED = 'Cuenta no creada',
        CUENTA_NOT_UPDATED = 'Cuenta no actualizada',
        CUENTA_NOT_DELETED = 'Cuenta no eliminada',
}

export enum Errores_Messages {
    FIREBASE_CONFIG_LOAD = 'Error al cargar configuración de Firebase',
    GETTING_ACCESS_TOKEN = 'Error al obtener el token de acceso',
    MESSAGE_SEND_ERROR = 'Error al envíar el mensaje'
}